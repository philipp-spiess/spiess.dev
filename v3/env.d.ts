/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    // biome-ignore lint/complexity/noBannedTypes:
    env: {}
  }
}
