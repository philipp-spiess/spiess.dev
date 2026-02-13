---
title: "Open-sourcing AgentLogs"
date: "2026-02-14"
draft: true
---

Over the past few weeks I built [AgentLogs](https://github.com/agentlogs/agentlogs), an early prototype of a platform for collaboration in the age of AI coding agents. This post outlines my motivation and why you might consider using it.

## 1. GitHub is Dying (and so Is the Traditional SDLC)

With the rise of AI coding agents, software engineering is undoubtedly undergoing massive changes right now.

Right now, teams are seeing big differences in output for folks starting to adopt these tools early and those that still haven't, and larger organizations are outpaced by smaller teams who amplify their output with AI.

Teams that are all-in on AI agents report big challenges scaling _traditional_ software engineering processes like code reviews or CI pipelines with the influx in code. Additionally, some teams are even starting to discourage the use of issue tracking systems. Instead, they pass detailed bug reports directly to agents running in the cloud that then directly propose a fix.

Outside of companies, open-source is facing similar challenges where the classical concept of pull-requests is no longer maintainable because of the increase in volume with _questionable quality_. Many well-known open-source projects are starting to completely close off pull requests or limit access to manually vetted contributors only. Issue discussions are also getting spammed with low quality content from agents all over the world.

And on top of all of this, GitHub has huge reliability issues and is now referred to as a [dumpster fire](https://www.reddit.com/r/ExperiencedDevs/comments/1r0cytn/has_github_just_become_a_dumpster_fire/) by the community already.

I don't think this is sustainable for long and unless there are some massive changes in a very short time, GitHub _is dying_ (and with it, probably the whole traditional SDLC).

There are, of course, countless teams currently thinking about what's next. Big AI labs doing strategic acquisitions[^1], planning software adding deeper code integrations to capture the market[^2], and new startups boasting with ridiculous seed funding rounds[^3]. But don't be fooled: _Nobody_ knows where this is heading right now.

My personal opinion is that collaboration for software projects will have to move to a higher level: from the code level to the prompt/spec level. The collaboration platform of the future will thus need to be much tighter integrated into AI coding agents than the current generation is.

## 2. Beyond a Single Coding Agent

I started my journey with AI agents in May last year: I realized pretty early that I put a lot of effort into prompts, effort that is lost once I commit the changes to git. In my career as software engineer, I often needed to do extensive code archeology to uncover _all_ context of a change to fix issues, so not being able to access all of it feels like a big limitation.

One of the first things I fully vibe coded was a small project called [claude-code-viewer](https://github.com/philipp-spiess/claude-code-viewer): A simple (and very broken) CLI that can upload the agent transcript to a web server where it's persisted with a URL. The idea was to document the agent transcript _with the git commit_ so that it's accessible in the future.

This project is slop and I didn't even use it myself. However, I still briefly mentioned it in my post about [How I use Claude Code](/blog/how-i-use-claude-code). To my surprise, this app _still has users today_. There are transcripts uploaded in February 2026, _9 months after I stopped thinking about it_. So this is clearly something people want.

Personally, I am no longer using Claude Code. Last year, I've instead been using many different coding agents including Codex CLI, Amp, Gemini CLI, and, most recently I became a [Pi](https://pi.dev/) convert. While the agent harness does continue to play a huge role in the agent's performance[^4], I do think that the gaps are closing and instead _personal preference_ is what's going to make you pick a coding agent in the future.

So, my bet is that teams will end up using _multiple_ coding agent harnesses in the future, maybe even specific harnesses for specific types of work. The collaboration platform of the future will need to support them all to some extent.

## Building AgentLogs

Over the last few weeks, I worked on [AgentLogs](https://github.com/agentlogs/agentlogs), an exploration of the two ideas: a new collaboration layer built for a world where teams use many different agents.

In its current version, AgentLogs is very simple: A few agent-specific plugins that hook into a shared CLI to convert your session to a unified schema and then uploads it to a server for storage.

What makes it special are two things:

1. You can onboard your whole team and learn how your teammates are using AI agents and what patterns work or not.
2. It will attempt to automatically link git commits made by the agent to the log so you will never lose this context.

![Screenshot of an agentlogs.ai session sharing that shows a Claude Code transcript to "Stream Claude Bash Command Output"](/blog/open-sourcing-agentlogs/screenshot.png)

## Why I Am Open Sourcing It

Initially AgentLogs was built to be a cloud solution.

However, I quickly realized that this is a _bad idea_. Agent sessions are a huge security liability since it's _very_ easy for it to leak secrets and other confidential information. AgentLogs attempts to guard against this by searching for thousands of well-known secret patterns and eliminating them from the logs before it's uploaded, but total security can, of course, not be guaranteed.

Because of this, I do think companies need to treat agent sessions as _highly sensitive data_ and should host it themselves on storage that they can safely delete from.

Additionally, as mentioned above, to make this tool useful for your team, you really want to integrate all coding agents your team is using. It's very trivial to add a new integration (since LLMs are notoriously good at converting one format to another) so making everything open will make it much easier to add the integrations you need.

The final nail in the coffin was that I was starting to think of this as a _collaboration platform_ more than just a viewer for logs and that I want to collaborate with others building it.

## What's Next

So, that's where we are right now. If you're curious, go check out and star it on [GitHub](https://github.com/agentlogs/agentlogs) (oh the irony) or sign up for the [cloud waitlist](http://agentlogs.ai/). I'd love to hear your thoughts about the future of the software development loop.

[^1]: E.g. [Cursor acquiring Graphite](https://cursor.com/blog/graphite)

[^2]: E.g. [Linear adding code reviews](https://linear.app/reviews)

[^3]: E.g. [Entire announcing a $60m seed round](https://entire.io/blog/hello-entire-world) with the initial release being a very similar product as AgentLogs in its current state.

[^4]: Check out Can's [article about hashline](https://x.com/_can1357/status/2021828033640911196) for a recent example
