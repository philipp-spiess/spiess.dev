---
title: "Software Collaboration in the AI Age"
date: "2026-02-13"
---

Let's start with two observations:

## 1. GitHub Is Dying (and so Is the Traditional SDLC)

With the rise of AI coding agents, software engineering is undoubtedly undergoing massive changes right now.

Teams are seeing big differences in output for folks starting to adopt these tools early and those that still haven't, and larger organizations are outpaced by smaller teams who amplify their output with AI.

Teams that are all-in on AI agents report big challenges scaling _traditional_ software engineering processes like code reviews or CI pipelines with the influx in code. Additionally, some teams are even starting to discourage the use of issue tracking systems altogether and instead pass a well-written bug report directly into a coding agent that will then propose a fix.

Outside of companies, open-source is facing similar challenges where the classical concept of pull-requests is no longer maintainable because of the increase in volume with _questionable quality_. Many well-known open-source projects are starting to close off or limit pull requests (e.g. [Codex](https://github.com/openai/codex/discussions/9956)). Issue discussions are also getting spammed with low quality content from agents all over the world.

And on top of all of this, GitHub has huge reliability issues and is now referred to as a [dumpster fire](https://www.reddit.com/r/ExperiencedDevs/comments/1r0cytn/has_github_just_become_a_dumpster_fire/) by the community already.

I don't think continuing this approach is sustainable for long and unless there are some massive changes in a very short time, GitHub _is dying_ (and with it, probably the whole traditional SDLC). And I'm [not](https://x.com/thorstenball/status/2022261665257971800) [the](https://updates.prototypecap.com/p/saas-is-dead) only one with this opinion.

## 2. Coding Agents Are Commodity

I started my journey with AI agents in May last year and wrote about [How I use Claude Code](/blog/how-i-use-claude-code) in June.

By now, I am no longer using Claude Code. Last year, I've instead been using many different coding agents including Codex CLI, Amp, Gemini CLI, Cursor, and, most recently I became a [Pi](https://pi.dev/) convert. While the agent harness does continue to play a huge role in the agent's performance[^4], I do think that the gaps are closing and instead _personal preference_ is what's going to make you pick a coding agent in the future.

Most people I talk to these days have at least once used a coding agent of some form already but there's far from _one coding agent to rule them all_.

So, my bet is that teams will end up using _multiple_ coding agent harnesses in the future, maybe even specific harnesses for specific types of work, some of them hyper-personalized to the team. The collaboration platform of the future will need to support them all to some extent.

## Where to Go from Here

There are, of course, countless teams currently thinking about what's next. Big AI labs doing strategic acquisitions[^1], planning software adding deeper code integrations to capture the market[^2], and new startups boasting with ridiculous seed funding rounds to build _the next GitHub_[^3].

But don't be fooled: _Nobody knows where this is heading_. The only thing that's clear is that existing systems can't scale with the increased rate at which code is now generated.

My guess is that collaboration for software projects will have to move to a higher level: from the code level to the spec level. Both product decisions and knowledge sharing will need to be done at the prompt level with the code being a generated artifact of it in many cases. The collaboration platform of the future will thus need to be much more tightly integrated into AI coding agents than the current generation.

In the same sense, code reviews will need to change dramatically. The old standard of "every line of code must be read by at least two humans" is hitting a limit already. Humans will start to be removed from the core code loop more and more. Personally, my guess is that instead of pull requests the first step will be that the developers start reviewing their own agent's code and the team only looks over the higher-level prompts to make sure the direction is right, only zooming into the code for more critical parts of the application.

Product-wise, my prediction is that we'll see new features being tested much more frequently but in the same vein we'll also see functionality removed much more often. Software is going to become a lot less rigid.

## Building AgentLogs

I realized pretty early in my coding agent journey that I put a lot of effort into prompts, effort that is lost once I commit the changes to Git. In my career as software engineer, I often needed to do extensive code archeology to uncover _all_ context of a change to fix issues, so not being able to access all of it feels like a big limitation.

One of the first things I fully vibe coded was a small project called [claude-code-viewer](https://github.com/philipp-spiess/claude-code-viewer): A simple (and very broken) CLI that can upload the agent transcript to a web server where it's persisted with a URL. The idea was to document the agent transcript _with the Git commit_ so that it's accessible in the future.

This project is slop and I didn't even use it myself. However, I still briefly mentioned it in my post about [How I use Claude Code](/blog/how-i-use-claude-code). To my surprise, this app _still has users today_. There are transcripts uploaded in February 2026, _9 months after I stopped thinking about it_. So this is clearly something people want.

Over the past few weeks I started building [AgentLogs](https://github.com/agentlogs/agentlogs), an open-source prototype of a platform for collaboration in the age of AI coding agents.

![Screenshot of an agentlogs.ai transcript sharing that shows a Claude Code transcript to "Stream Claude Bash Command Output"](/blog/software-collaboration-in-the-ai-age/screenshot.png)

In its current version, AgentLogs is very simple: A few agent-specific plugins that hook into a shared CLI to convert your transcript to a unified schema and then uploads it to a server for storage.

What makes it special are two things:

1. You can onboard your whole team and already see how your teammates are using AI agents and what patterns work or not.
2. Since AgentLogs automatically adds links to Git commit messages, you already get a good sense of what's in the code change only by looking at the prompt.

## Why I'm Open-Sourcing It

When building AgentLogs, I quickly realized that keeping it private and distributing it as a typical SaaS is a _bad idea_.

One aspect is that agent transcripts are a huge security liability since it's _very_ easy for it to leak secrets and other confidential information. AgentLogs attempts to guard against this by searching for thousands of well-known secret patterns and eliminating them from the logs before it's uploaded, but total security can, of course, not be guaranteed. Because of this, I do think companies need to treat agent transcripts as _highly sensitive data_ and should keep it on infrastructure they can reliably delete from (even though it might be tempting to store this information in Git together with the code changes).

Another realization is that to make this tool useful for your team, you really want to integrate all coding agents your team is using. Even if they have DIY ones. In its current version, it's very trivial to add a new integration (since LLMs are notoriously good at converting one format to another) so making everything open makes it easy to add the integrations you need.

But the turning point was once I started calling it a _collaboration platform_. If the vision is to rethink how teams work together in the AI age, this can't happen in a silo. Open-sourcing it felt like the only honest approach.

## What's Next

If you're curious, the code is on [GitHub](https://github.com/agentlogs/agentlogs) (oh, the irony). It's not much but it's a start, and you're invited to shape it in any way it makes sense for you. Now is the time to really rethink best practices.

[^1]: E.g. [Cursor acquiring Graphite](https://cursor.com/blog/graphite)

[^2]: E.g. [Linear adding code reviews](https://linear.app/reviews)

[^3]: E.g. [Entire announcing a $60m seed round](https://entire.io/blog/hello-entire-world) with the initial release being a very similar product as AgentLogs in its current state.

[^4]: Check out Can's [article about hashline](https://x.com/_can1357/status/2021828033640911196) for a recent example
