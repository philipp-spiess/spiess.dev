---
date: 2024-02-01
---
If you've never come across it, I highly recommend you read up on [Theorycraft](https://en.wikipedia.org/wiki/Theorycraft). Because *of course* there exist a huge subculture in the internet that is trying to mathematically optimize video games and *of course* I’m going to start my article with it. 

Whenever arguments in video game Discord chats arise about how to optimally play in a certain scenario, people would cite the research made by Theorycraft. But sometimes people insist that playing in a different way is better. Well, you know the internet folks, these people will be called *words*. One of the words that stuck with me was "Feelscraft". Huh, what an insult!

But what is Feelscraft software? Well, for me it is acting on intuition and experience rather than data and common knowledge when making product decisions. It is shipping a feature even though you do not have the metrics to back it up. And, as usual, I have ambivalent feelings about it. 

Much like the Theorycraft folks in the video game scene, I strive to make the best product choices. Working on the most requested feature that is also sure to increase revenue and that has measurable impact on our user base. And, in a perfect world, we also have all the data necessary to make these decisions and there is only one valid way to solve a problem to begin with. However, in reality, this is hardly the case and this is when Feelcraft comes in handy.

I do think that intuition is often overused, though. When it's used, it's *very* hard to understand why certain choices were done for people outside of the decision metrics process. One example of Feelscraft Software is from my time at Meta when I read a product announcement that stated that a new implementation of an existing feature is being shipped because *it shows no regression in usage metrics over the old one*. And that after weeks and weeks of improvements on the new implementation... I think that's a low standard for pushing a new product, don't you think? 

Another more recent example that I have seen are numerous changes of an LLM prompt in the hope to improve the product. LLMs are inherently prone to variation in their outcome and making decisions on whether a prompt is better than another normally requires *thousands* and more different samples. That's why we at [Cody](https://sourcegraph.com/cody) are investing so heavily into online and offline evaluation methods. Yet, every now and then I see the industry making changes on prompts based on *intuition*. 

I have been guilty, too, of course! In my most recent work on [Cody autocomplete](https://sourcegraph.com/blog/the-lifecycle-of-a-code-ai-completion) I have often made subtle decisions in the because it *felt better*. Things like setting initial debounce times too low or cut-off ratios too aggressive. However, we had to get the product out in some way or another and only after getting usage we were able to validate these initial assumptions and make *informed decisions* (which, of course, resulted in my tweaking these values later).

So, the next time you try to understand how a software decision has been made, remember to think about the Feelcraft behind it. 😉