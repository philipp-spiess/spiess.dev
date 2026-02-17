/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/scheduling-in-react",
        destination: "/blog/scheduling-in-react",
        permanent: true,
      },
      {
        source: "/note/engineering/ml/embeddings",
        destination: "/note/engineering/ai/embeddings",
        permanent: true,
      },
      {
        source: "/note/engineering/ml/jaccard-similarity",
        destination: "/note/engineering/ai/jaccard-similarity",
        permanent: true,
      },
      {
        source: "/blog/open-sourcing-agentlogs",
        destination: "/blog/software-collaboration-in-the-ai-age",
        permanent: true,
      },
    ];
  },

  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
};

module.exports = nextConfig;
