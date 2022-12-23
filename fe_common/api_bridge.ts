import {
  ApiSendChatMessagePayload,
  ChatRoomEvent,
  Side,
} from "../domain/types.ts";
import { postJson } from "./api_helpers.ts";

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
  async sendChatMessage(userId: string, text: string, side: Side) {
    await postJson<ApiSendChatMessagePayload>("/api/send", {
      userId,
      text,
      side,
    });
  },
};
