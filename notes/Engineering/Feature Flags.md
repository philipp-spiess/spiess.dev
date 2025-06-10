---
date: 2024-02-21
---

Feature flags are a powerful technique that every engineer should have in their toolbox. They allow you to ship changes incrementally and reduce risk when releasing new features. Here are my thoughts on why you should use feature flags:

- **Avoid big bang releases:** With feature flags, you can push out changes regularly without affecting all users at once. This makes it easier to review pull requests since the changes are smaller. No more waiting days or weeks to merge in order to batch changes.

- **Reduce risk:** New features can be released to a small percentage of users first. If issues come up, simply turn off the flag before rolling out widely. This protects your whole user base from potentially breaking changes.

- **Enable experimentation:** By targeting feature flags to different user segments, you can run A/B tests and collect data on how new features are performing. This allows you to validate ideas before fully releasing (and allows you to collect awesome graphs for your next review period 😉).

- **Simplify rollbacks:** If a new feature causes problems after being released, you can instantly roll back by disabling the flag (often referred to as a kill switch). This is especially handy if you can remotely control those flags.

- **Improve code hygiene:** Make sure to clean up unused flags over time. Centralize flags in one place like an enum to avoid combinatorial complexity.

Feature flags don't have to be complex, either. Something as simple as a config boolean can get you started. And you don't necessarily need third-party tools for simple use cases. Just try it out on your next feature branch!
