// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/about.tsx";
import * as $1 from "./routes/api/connect.ts";
import * as $2 from "./routes/api/send.ts";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/ChatInputArea.tsx";
import * as $$1 from "./islands/ChatTimeline.tsx";

const manifest = {
  routes: {
    "./routes/about.tsx": $0,
    "./routes/api/connect.ts": $1,
    "./routes/api/send.ts": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/ChatInputArea.tsx": $$0,
    "./islands/ChatTimeline.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
