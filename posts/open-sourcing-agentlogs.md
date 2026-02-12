---
title: "Open-sourcing AgentLogs"
date: "2026-02-14"
draft: false
---

TL;DR: Over the past few weeks I worked on [AgentLogs](https://github.com/agentlogs/agentlogs), an early prototype of a platform for collaboration in the age of AI coding agents. This week, I'm publishing all existing work and move the work into the open. I invite you to join and figure out the future of collaboration together.

## GitHub is Dying

With the rise of AI coding agents, software engineering is undoubtedly undergoing massive changes right now.

Right now, teams are seeing big differences in output for folks starting to adopt these tools early and those that still haven't and larger organizations are outpaced by smaller teams who amplify their output with AI.

Teams that are all-in on AI agents report big challenges scaling _traditional_ software engineering processes like code reviews or CI pipelines with the influx in code. Additionally, some teams are even starting to discourage the use of issue tracking systems and instead write detailed bug reports directly to agents running on the cloud that then directly propose a fix.

Outside of companies, open-source is facing similar challenges where the classical concept of pull-requests is no longer maintainable because of the increase in volume with _questionable quality_. Many well-known open-source project completely are starting to completely close off pull requests or limit access to manually vetted contributors only. Issue discussions are also getting spammed with low quality content from agents all over the world.

And on top of all of this, GitHub has huge reliability issues and is now referred to as [dumpster fire](https://www.reddit.com/r/ExperiencedDevs/comments/1r0cytn/has_github_just_become_a_dumpster_fire/) by the community already.

I don't think this is sustainable for long and unless there are some massive changes in a very short time GitHub _is dying_ (and with it, probably the whole traditional SDLC).

There are, of course, countless of teams currently thinking about what's next. Big AI labs doing strategic acquisitions[^1], planning software adding deeper code integrations to capture the market[^2], and new startups boasting with ridiculous seed funding rounds[^3]. But don't be fooled: _Nobody_ knows where this is heading right now.

## Beyond a Single Coding Agent

I, too, have been thinking about this problem space ever since I started my journey with AI agents in May last year: I realized pretty early that I put a lot of effort into prompts, all of which is lost once I commit the changes to git. However, in my career as software engineer I needed to do extensive code archeology before to fix issues

One of the first things I fully vibe coded was a small project called [claude-code-viewer](https://github.com/philipp-spiess/claude-code-viewer): A simple (and very broken) CLI that can upload the agent transcript to a web server where it's persisted with a URL. The idea was to document the agent transcript _with the git commit_ so that it's accessible in the future.

This project is absolute slop though and I didn't even use it on my own. I only briefly mentioned it in my post about [How I use Claude Code](/blog/how-i-use-claude-code). But to my surprise, this app _still has users today_. There are transcripts uploaded in February 2026, _9 months after I stopped thinking about it_.

Personally, I am no longer using Claude Code. Last year, I've instead been using many different coding agents including Codex CLI, Amp, Gemini CLI, and, most recently I became a [Pi](https://pi.dev/) convert. While the agent harness does continue to play a huge role in the agents performance[^4], I do think that the gaps are closing and instead _personal preference_ is what's going to make you pick a coding agent in the future.

So, my bet is that teams will end up using multiple coding agent harnesses in the future, maybe specific harnesses for specific types of work, and the collaboration platform of the future will need to support them all to some extend.

## Building AgentLogs

Over the last few weeks, I build a second attempt.

## Why I Am Open Sourcing It

[^1]: E.g. [Cursor acquiring Graphite](https://cursor.com/blog/graphite)

[^2]: E.g. [Linear adding code reviews](https://linear.app/reviews)

[^3]: E.g. [Entire announcing a $60m seed round](https://entire.io/blog/hello-entire-world)

[^4]: Check out Can's [article about hashline](https://x.com/_can1357/status/2021828033640911196) for a recent example
