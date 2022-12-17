import { ApiSendChatMessagePayload } from "./types.ts";

function postJson<T>(url: string, payload: T) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const apiBridge = {
  sendChatMessage(userId: string, text: string) {
    postJson<ApiSendChatMessagePayload>("/api/send", { userId, text });
  },
};
