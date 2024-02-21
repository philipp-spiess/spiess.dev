import { useEffect } from "react"
import { log } from "@logkit/client"

export default function LogkitAnalytics() {
  useEffect(() => register(), [])
  return null
}

let didRegister = false
function register() {
  if (didRegister) {
    return
  }
  didRegister = true

  const history = window.history
  if (history.pushState) {
    const originalPushState = history.pushState
    history.pushState = function (...args) {
      originalPushState.apply(this, args)
      logView()
    }
    window.addEventListener("popstate", logView)
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      logView()
    }
  }

  if ((document.visibilityState as any) === "prerender") {
    document.addEventListener("visibilitychange", handleVisibilityChange)
  } else {
    logView()
  }
}

let lastViewedPage: null | string = null
function logView(): void {
  if (lastViewedPage === window.location.pathname) {
    return
  }
  lastViewedPage = window.location.pathname

  log("pageview", {
    origin: window.location.origin,
    pathname: lastViewedPage,
    referrer: document.referrer,
  })
}
