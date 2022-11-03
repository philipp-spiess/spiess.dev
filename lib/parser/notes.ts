import format from "date-fns/format";
import { parseMarkdown } from "./markdown";

export interface Note {
  title: string;
  id: string;
  formattedDate: string;
  date: string;
  category: string[];
  contentHtml: string;
}

const TOKEN = process.env.GITHUB_TOKEN;
const COMMITS_URL =
  "https://api.github.com/repos/philipp-spiess/philipp-spiess/commits?page=1&per_page=100&path=";
const GRAPHQL_URL = "https://api.github.com/graphql";
const HIDDEN_FILES = new Set(["README.md"]);
const HIDDEN_DIRS = new Set(["Unlisted"]);

// No-op, used only for syntax highlighting in the IDE
function gql(strings: TemplateStringsArray) {
  return strings.raw.join("");
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const CONTENTS_QUERY = gql`
  {
    repository(name: "philipp-spiess", owner: "philipp-spiess") {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            tree {
              entries {
                ...MyTreeEntry
                object {
                  ... on Tree {
                    entries {
                      ...MyTreeEntry
                      object {
                        ... on Tree {
                          entries {
                            ...MyTreeEntry
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment MyTreeEntry on TreeEntry {
    path
    type
    blob: object {
      ... on Blob {
        text
      }
    }
  }
`;

export async function getNotes(): Promise<Note[]> {
  let notes: Note[] = [];
  const rawNotes = (await fetchNotes()) as any;

  for (const rawNote of rawNotes) {
    const { data, contentHtml } = await parseMarkdown(rawNote.content);

    const date =
      data.date != null ? data.date : await getCreationDate(rawNote.path);

    notes.push({
      title: rawNote.path.split("/").pop().replace(".md", ""),
      id: getId(rawNote.path),
      date,
      formattedDate: format(new Date(date), "LLLL d, Y"),
      category: rawNote.path.split("/").slice(0, -1),
      contentHtml,
    });
  }

  // Sort posts by date
  return notes.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

interface RawNote {
  path: string;
  content: string;
}
async function fetchNotes(dir: string = ""): Promise<RawNote[]> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: CONTENTS_QUERY }),
  }).then((r) => r.json());

  return recursivelyResolveEntries(res.data.repository.ref.target.tree);
}

interface GitHubTree {
  entries: Array<
    | {
        path: string;
        type: "blob";
        blob: {
          text: string;
        };
      }
    | {
        path: string;
        type: "tree";
        object: GitHubTree;
      }
  >;
}
function recursivelyResolveEntries(tree: GitHubTree): RawNote[] {
  let result: RawNote[] = [];
  for (let entry of tree.entries) {
    if (entry.type == "blob") {
      if (!entry.path.endsWith(".md") || HIDDEN_FILES.has(entry.path)) {
        continue;
      }

      result.push({
        path: entry.path,
        content: entry.blob.text,
      });
    } else {
      if (HIDDEN_DIRS.has(entry.path)) {
        continue;
      }

      result = result.concat(recursivelyResolveEntries(entry.object));
    }
  }
  return result;
}

async function getCreationDate(path: string): Promise<string> {
  const commits = await fetch(COMMITS_URL + path, {
    headers,
  }).then((r) => r.json());
  const firstCommit = commits[commits.length - 1];
  return firstCommit.commit.author.date;
}

function getId(text: string): string {
  return text.replace(".md", "").split("/").map(getSlug).join("/");
}

function getSlug(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
