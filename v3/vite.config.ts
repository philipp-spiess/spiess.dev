import {
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
  vitePlugin as remix,
} from "@remix-run/dev"
import { defineConfig } from "vite"
import envOnly from "vite-env-only"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy({
      async getLoadContext() {
        const { getPlatformProxy } = await import("wrangler")
        // biome-ignore lint/complexity/noBannedTypes:
        const proxy = await getPlatformProxy<{}>({ persist: true })

        return { env: proxy.env }
      },
    }),
    remix(),
    tailwindcss(),
    tsconfigPaths(),
    envOnly(),
  ],
})
