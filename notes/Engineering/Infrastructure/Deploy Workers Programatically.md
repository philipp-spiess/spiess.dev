---
date: 2024-04-02
---
You can deploy Cloudflare Workers via the HTTP API and thus dynamically create Workers. The canonical solution for this is to use [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) however you can also do it with a free Cloudflare account. Documentation for this feature is sparse but thanks to [this Cloudflare Community post](https://community.cloudflare.com/t/deploy-a-worker-via-http-api/108439/4) I came up with this:

**Update:** Well, turns out there is actually quite good documentation on that API in [the Cloudflare API Docs](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module) 🙃.
### 1. Bundle your Worker

If you already have `wrangler` set up, you can bundle your worker by running `wrangler build`. This will build the worker into the `dist/` folder.

### 2. Prepare your Metadata

Worker metadata is a configuration format that contains the runtime info from your `wrangler.toml` file. You can learn more about it [in the Worker metadata docs](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/metadata/).

Without any bindings, the minimum metadata might look like this:

```json
{"main_module":"worker.js","bindings":[]}
```

## 3. Upload your Worker

Now upload your worker:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/scripts/<SCRIPT_NAME>" \
    -H "Authorization: Bearer <CF_API_TOKEN>" \
    -H "Content-Type: multipart/form-data" \
    --form 'worker.js=@"dist/worker.js";type=application/javascript+module' \
    --form 'metadata="{\"main_module\":\"worker.js\",\"bindings\":[]}"'

{
  "result": {
    "created_on": "2024-04-02T21:27:40.527498Z",
    "modified_on": "2024-04-02T21:27:40.527498Z",
    "id": "<SCRIPT_NAME>",
    "tag": "aabbcc",
    "tags": [],
    "deployment_id": "aabbcc",
    "tail_consumers": null,
    "logpush": false,
    "etag": "aabbcc",
    "handlers": [
      "fetch"
    ],
    "last_deployed_from": "api",
    "usage_model": "standard"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```


Notes on the params:
- `ACCOUNT_ID` can be found in the Cloudflare dashboard URL
- `SCRIPT_NAME` is the name of your new worker and will be part of the default subdomain
- `CF_API_TOKEN` must be an [Edit Cloudflare Workers API token](https://dash.cloudflare.com/profile/api-tokens) 

### 4. Publish the Worker via Subdomain

The last step is to publish the Worker to be accessible via subdomain. The domain for this will depend on the `workers.dev` subdomain assigned for your Cloudflare account, e.g.: `<SCRIPT_NAME>.myapp.workers.dev`.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/services/<SCRIPT_NAME>/environments/production/subdomain" \
 -H "Authorization: Bearer $CF_API_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"enabled": true}'
{
  "result": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

