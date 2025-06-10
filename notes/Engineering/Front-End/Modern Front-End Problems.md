---
date: 2022-11-03
---
This is a list of non-trivial problems I have come across in the front-end community over the past few years. It mostly exists as a personal reminder. [Let me know](https://twitter.com/PhilippSpiess) if you have something that should be added here!

- **Accessibility:** Making web apps accessible because it’s so easy with the Web fundamentals to break things.
- **Bundle coverage:** A lot of the code that is shipped in today’s bundles (CSS, JS, etc.) is not needed for the first render.
- **Data waterfalls:** Waterfalls is a term used to describe serial loading dependencies. E.g. to render a list of users we first download the list component, wait for it to load, then the list component makes a request to an API, waits for it to load, etc. 
  
  This is the number one issue that I have seen causing websites to be slow. It often manifests itself as a myriad of uncontrolled loading states that sometimes end in another loading state popping up. 😵‍💫
  
  An interesting observation: Most applications could be able to resolve all the data needed for the initial page load on the server side based on the URL, params, and authentication tokens.
- **Overfetching/underfetching:** A client should only ever get as many data as it needs to render. Anything more is not needed and everything less is not enough.
- **Interaction delays**: If I interact with an item on the website, it should show an instant response. 
- **Layout shifting:** Once the first elements on a website are shown, you don't want to have them jump around. This only causes confusion to the user and results in a poor experience.
- **Developer experience:** I think this term is often overused but the current way we write apps is definitely not the end game. We need constant improvements to the tooling because the cost of building is still way too high.
- **Hydration:** When you have a server-rendered HTML page and it needs to become interactive ASAP.
- **Reliability:** A meta-term that is all about _knowing_ if your app functions. There are many vectors this can be done, however easy mechanisms also have a weak correlation to actual user problems.
	- Error handling/tracking. Unfortunately knowing that an error was thrown does not often relate to a broken website—Is the error recoverable by a user or is it crashing the whole page?
	- Browser crashes/freezes/loops
	- Uptime
	- Tracking core interaction uptime
- **Performance:** This is a very convoluted term that justifies it’s own note. Until then, here are some thoughts:
	- Measuring page loads is usually simpler than measuring interactions (navigations, popups).
	- You can measure performance in a lab but this will only ever be a *proxy* to the real-user performance metrics (aka RUM—Real User Monitoring).
- **Efficiency:** Another meta-term for a few lower-level optimzations that rarely cause problems (but when they do, they are noticeable):
	- Memory usage
	- Heavy CPU usage
	- Uncontrolled scheduled tasks (e.g. `setInterval`)
	- Browser rendering issues
	- Network/IO overhead
- **Testing:** While software testing is hard in every environment, front-end has a couple of special complexity with things like visual regression testing, accessibility testing, the reliance on a backend API, or the flakiness of browser instrumentation.
- **Observability:** Knowing how your app functions is a complex problem in itself. Traditionally, the web platform was very limited in how much data we have available with a big focus on analytics. Lately there have been a few amazing developments though: 
	- [Async Context](https://github.com/tc39/proposal-async-context) is a recent proposal to bring zones.js to the platform which will allow for easer tracing APIs in the future.
	- [JavaScript Self-Profiling API](https://github.com/WICG/js-self-profiling) brings process sampling features to the web platform.