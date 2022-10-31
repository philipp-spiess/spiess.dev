---
title: "Scheduling in React"
date: "2019-03-07T16:00:00.000Z"
---

In modern applications, user interfaces often have to juggle multiple tasks at the same time. For example, a search component might need to respond to user input while providing auto completion results, and an interactive dashboard might need to update charts while loading data from the server and sending analytics data to a backend.

All these parallel steps can lead to slow and unresponsive interfaces and unhappy users, so let’s learn how we can fix this.

## Scheduling in User Interfaces

Our users expect immediate feedback. Whether they are clicking on a button to open a modal or adding text to an input field, they don’t want to wait before seeing some kind of confirmation. For example, the button could show a modal and the input field could display the key that was typed.

To visualize what happens when this is not the case, let’s take a look at the demo application that Dan Abramov presented at his talk, [Beyond React 16](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html), at JSConf Iceland 2018.

The application works like this: The more you type into the input below, the more detailed the charts below will get. Since both of the updates (the input element and the chart) run at the same time, the browser has to do so much computation that it will drop some frames. This leads to noticeable delays and a bad user experience:

<video src="/blog/scheduling-in-react/sync-mode.mp4" muted="true" autoplay muted playsinline loop></video>

However, a version that prioritizes updating the input with new keystrokes will appear to the end user as though it’s running a lot faster. This is because users receive immediate feedback even though the same computation time is required:

<video src="/blog/scheduling-in-react/concurrent-mode.mp4" muted="true" autoplay muted playsinline loop></video>

Unfortunately, current web user interface architectures make it non-trivial to implement prioritization. One way to work around this problem is by [debouncing](https://davidwalsh.name/javascript-debounce-function) the chart update. The problem with this approach is that the charts still render synchronously when the debounced callback fires, which will again cause the user interface to be unresponsive for some time. We can do better!

## Browser Event Loop

Before we learn more about how proper prioritizing of updates can be achieved, let’s dig deeper and understand why the browser has issues with these kind of user interactions.

JavaScript code is executed in one thread, meaning that only one line of JavaScript can be run at any given time. The same thread is also responsible for other document lifecycles, like layout and paint.[^1] This means that whenever JavaScript code runs, the browser is blocked from doing anything else.

To keep the user interface responsive, we only have a very short timeframe before we need to be able to receive the next input events. At the Chrome Dev Summit 2018, Shubhie Panicker and Jason Miller gave a talk, [A Quest to Guarantee Responsiveness](https://developer.chrome.com/devsummit/schedule/scheduling-on-off-main-thread). During the talk, they showed the following visualization of the browser’s run loop, in which we can see that we only have 16ms (on a typical 60Hz screen) before the next frame is drawn and the next event needs to be processed:

![The browser event loop starts by running input handlers. Then it runs animation frame callbacks, and it ends with document lifecycles (style, layout, paint). All of this should complete within one frame, which is approximately 16ms on a 60Hz display.](/blog/scheduling-in-react/event-loop-browser.png)

Most JavaScript frameworks (including the current version of React) will run updates synchronously. We can think of this behavior as a function `render()` that will only return once the DOM is updated. During this time, the main thread is blocked.

## Problems with Current Solutions

With the information above, we can formulate two problems that we have to solve in order to get to more responsive user interfaces:

1. **Long-running tasks cause frame drops.** We need to make sure all of our tasks are small and can be completed within a couple of milliseconds so that we can run them within one frame.

2. **Different tasks have different priorities.** In the example application above, we saw that prioritizing the user input leads to a better experience overall. To do this, we need a way to define the order and to schedule tasks accordingly.

## Concurrent React and the Scheduler

_⚠️ Warning: The following APIs are not yet stable and will change. I will do my best to keep this post updated (Last Update: April 2019)._

To implement a properly scheduled user interface with React, we have to look into two upcoming React features:

- **Concurrent React (also known as Time Slicing).** With the help of the new [Fiber architecture](https://www.youtube.com/watch?v=ZCuYPiUIONs) rewrite that was released with React 16, React can now pause during rendering and yield[^2] to the main thread.

  We will hear more about Concurrent React in the future. For now it is important to understand that when this mode is enabled, React will split the synchronous rendering of our React components into pieces that are run over multiple frames.

  ➡️ With this feature, we’re able to split long-running rendering tasks into small chunks.

- **Scheduler.** The general purpose cooperative main thread scheduler is developed by the React Core team and makes it possible to register callbacks with different priority levels in the browser.

  At the time of writing this article, the priority levels are:

  - `Immediate` for tasks that need to run synchronously.
  - `UserBlocking` (250ms timeout) for tasks that should run as the result of a user interaction (e.g. a button click).
  - `Normal` (5s timeout) for updates that don’t have to feel instantaneous.
  - `Low` (10s timeout) for tasks that can be deferred but must still complete eventually (e.g. an analytics notification).
  - `Idle` (no timeout) for tasks that do not have to run at all (e.g. hidden offscreen content).

  The timeouts for each priority level are necessary to make sure that lower priority work still runs even if we have so much higher priority work to do that the higher priority work could run continuously. In scheduling algorithms, this problem is referred to as [starvation](<https://en.wikipedia.org/wiki/Starvation_(computer_science)>). The timeouts give us the guarantee that every scheduled task will eventually run. For example, we won’t miss a single analytics notification, even if we have ongoing animations in our app.

  Under the hood, the Scheduler will store all registered callbacks in a list ordered by the expiration time (which is the time at which the callback was registered plus the timeout of the priority level). Then, the Scheduler will itself register a callback that is run after the next frame is drawn by the browser.[^3] Within this callback, the Scheduler will execute as many of the registered callbacks as possible until it’s time to render the next frame.

  ➡️ With this feature, we can schedule tasks with different priorities.

## Scheduling in Action

Let’s see how we can use these features to make an app feel a lot more responsive. To do this, we’ll take a look at [ScheduleTron 3000](https://github.com/philipp-spiess/scheduletron3000), an app I built that allows users to highlight a search term in a list of names. Let’s take a look at the initial implementation first:

<!-- prettier-ignore -->
```js
// The app shows a search box and a list of names. The list is
// controlled by the searchValue state variable, which is updated
// by the search box.
function App() {
  const [searchValue, setSearchValue] = React.useState();

  function handleChange(value) {
    setSearchValue(value);
  }

  return (
    <div>
      <SearchBox onChange={handleChange} />
      <NameList searchValue={searchValue} />
    </div>
  );
}

// The search box renders a native HTML input element and keeps
// it controlled using the inputValue variable. When a new key
// is pressed, it will first update the local inputValue, then it
// will update the App component’s searchValue, and then it will
// simulate an analytics notification to our servers.
function SearchBox(props) {
  const [inputValue, setInputValue] = React.useState();

  function handleChange(event) {
    const value = event.target.value;

    setInputValue(value);
    props.onChange(value);
    sendAnalyticsNotification(value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
    />
  );
}

ReactDOM.render(<App />, container);
```

_ℹ️ This example uses [React Hooks](https://reactjs.org/docs/hooks-intro.html). If you’re not familiar with this new React feature, take a look at the [CodeSandbox code](https://codesandbox.io/s/j3zrqpzkr5). Additionally, you might wonder why we use two different state variables for this example. We’ll find out why this is needed in a bit._

Try it out! Type a name (e.g. “Ada Stewart”) in the search box below and see how it works:

<iframe src="https://codesandbox.io/embed/j3zrqpzkr5?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

You might notice that the interface is not very responsive. To amplify the issue, I artificially slowed down the rendering time of the names list. And since this list is big, it has a significant impact on the application’s performance. This is not good 😰.

Our users expect immediate feedback, but the app is unresponsive for quite some time after a keystroke. To understand what’s going on, let’s take a look at the DevTools’ Performance tab. Here’s a screenshot of a recording I made while I type the name “Ada” into the search box:

![Screenshot of Chrome DevTools that shows that the three keypress events take 733ms to render.](/blog/scheduling-in-react/devtools-sync.png)

We can see there are a lot of red triangles, which is usually not a good sign. For every keystroke, we see a `keypress` event being fired. All three events run within one frame,[^4] which causes the duration of the frame to extend to **733ms**. That’s way above our average frame budget of 16ms.

Inside this `keypress` event, our React code will be called, which causes the input value and the search value to update and then send the analytics notification. In turn, the updated state values will cause the app to rerender down to every individual name. That’s quite a lot of work that we have to do, and with a naive approach, it would block the main thread!

The first step toward improving the status quo is to enable the unstable Concurrent Mode. This can be done by creating the React root with the new `ReactDOM.createRoot` API like this:

```diff
- ReactDOM.render(<App />, container);
+ const root = ReactDOM.unstable_createRoot(rootElement);
+ root.render(<App />);
```

However, enabling Concurrent Mode alone will not change the experience in our case. React will still receive both state updates at the same time, so there’s no way of knowing which is less important.

We instead want to set the input value first so that we only need to update the search box in the beginning. Updates to the search value and our analytics notification should happen later. To do this, we’re using an API exposed by the Scheduler package (which can be installed with `npm i scheduler`) to enqueue a lower priority callback:

```js{1,10-14}
import { unstable_next } from "scheduler";

function SearchBox(props) {
  const [inputValue, setInputValue] = React.useState();

  function handleChange(event) {
    const value = event.target.value;

    setInputValue(value);
    unstable_next(function() {
      props.onChange(value);
      sendAnalyticsNotification(value);
    });
  }

  return <input type="text" value={inputValue} onChange={handleChange} />;
}
```

Inside the API we’re using, `unstable_next()`, all React updates will be scheduled with the `Normal` priority, which is lower then the default priority inside an `onChange` listener.

Indeed, with this change, our input box already feels a lot more responsive, and frames no longer get dropped while we’re typing. Let’s take another look at the Performance tab together:

![Screenshot of Chrome DevTools that shows that React breaks the rendering work down into small chunks. All frames can be drawn very quickly, although the analytics notifications are still sent in the middle of the rendering work.](/blog/scheduling-in-react/devtools-normal.png)

We see that the long-running tasks are now broken down into smaller ones that can be completed within a single frame. The red triangles that indicate frame drops are also gone.

However, one thing that is still not ideal is that the analytics notification (highlighted in the above screenshot) is still executed with the rendering work. Since the users of our app do not see this task, we can schedule a callback with an even lower priority for that:

<!-- prettier-ignore -->
```js
import {
  unstable_LowPriority,
  unstable_scheduleCallback
} from "scheduler";

function sendDeferredAnalyticsNotification(value) {
  unstable_scheduleCallback(unstable_LowPriority, function() {
    sendAnalyticsNotification(value);
  });
}
```

If we now use `sendDeferredAnalyticsNotification()` in our search box component and take another look at the Performance tab with this change and scroll toward the end, we’ll see that our analytics are now sent after all rendering work has completed, and so all the tasks in our app are perfectly scheduled:

![Screenshot of Chrome DevTools that show that React breaks the rendering work down into small chunks. Analytics are sent at the end after all rendering work has completed.](/blog/scheduling-in-react/devtools-normal-and-low.png)

Try it out:

<iframe src="https://codesandbox.io/embed/71ly7qx83x?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Limitations of the Scheduler

With the Scheduler, it’s possible to control in what order callbacks are executed. It’s built deep into the latest React implementation and works out of the box with Concurrent mode.

That said, there are two limitations of the Scheduler:

1. **Resource Fighting.** The Scheduler tries to use all of the resources available. This causes issues if multiple instances of a scheduler run on the same thread and compete for resources. We need to ensure that all parts of our application will use the same instance.
2. **Balancing user-defined tasks with browser work.** Since the Scheduler runs in the browser, it only has access to the APIs the browser exposes. Document lifecycles like rendering or garbage collection can interfere with the work in an uncontrollable way.

To remove these limitations, the Google Chrome team is working together with React, Polymer, Ember, Google Maps, and the Web Standards Community to create a [Scheduling API in the browser](https://github.com/spanicker/main-thread-scheduling). What an exciting time!

## Conclusion

Concurrent React and the Scheduler allow us to implement scheduling of tasks in our applications which will allow us to create highly responsive user interfaces.

The official release for these features will likely happen in [Q2 2019](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-q2-2019-the-one-with-concurrent-mode). Until then, you can play around with the unstable APIs, but be aware that they will change.

If you want to be among the first to know when these APIs change or when documentation for the new features is written, subscribe to [This Week in React ⚛️](https://this-week-in-react.org).

[^1]: The MDN web docs feature a great [article](https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Intensive_JavaScript) about this issue.
[^2]: This is a fancy term for returning for a function that is able to resume. Check out [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) for a similar concept.
[^3]: In the [current implementation](https://github.com/facebook/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js), this is achieved by using [`postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) inside a [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) callback. This will then be called right after the frame is rendered.
[^4]: After processing the first `keypress` event, the browser sees pending events in its queue and decides to run the event listener before rendering the frame.
