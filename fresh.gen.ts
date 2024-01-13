// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $about from "./routes/about.tsx";
import * as $api_connect from "./routes/api/connect.ts";
import * as $api_send from "./routes/api/send.ts";
import * as $index from "./routes/index.tsx";
import * as $ChatInputArea from "./islands/ChatInputArea.tsx";
import * as $ChatTimeline from "./islands/ChatTimeline.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/about.tsx": $about,
    "./routes/api/connect.ts": $api_connect,
    "./routes/api/send.ts": $api_send,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/ChatInputArea.tsx": $ChatInputArea,
    "./islands/ChatTimeline.tsx": $ChatTimeline,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
