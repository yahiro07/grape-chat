import { createBroadcastChannelWrapper } from "../helpers/broacast_channel_wrapper.ts";
import { ChatRoomEvent } from "./types.ts";

export function createRoomChannel() {
  return createBroadcastChannelWrapper<ChatRoomEvent>(
    "chat-master-room-channel"
  );
}
