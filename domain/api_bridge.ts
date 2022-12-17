import { ApiSendChatMessagePayload, ChatRoomEvent } from "./types.ts";

export const apiBridge = {
  subscribeMessages(callback: (event: ChatRoomEvent) => void) {
    const eventSource = new EventSource(`/api/connect`);
    const listener = (e: MessageEvent) => {
      const message = JSON.parse(e.data) as ChatRoomEvent;
      callback(message);
    };
    eventSource.addEventListener("message", listener);
    return () => eventSource.removeEventListener("message", listener);
  },
  sendChatMessage(userId: string, text: string) {
    postJson<ApiSendChatMessagePayload>("/api/send", { userId, text });
  },
};

function postJson<T>(url: string, payload: T) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
