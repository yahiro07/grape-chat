import { HandlerContext } from "../../deps_backend.ts";
import { createRoomChannel } from "../../domain/room_channel.ts";
import { storehouse } from "../../domain/storehouse.ts";
import { ApiSendChatMessagePayload, ChatMessage } from "../../domain/types.ts";
import { generateRandomId } from "../../core_helpers/domain_related_helpers.ts";

export async function handler(
  req: Request,
  _ctx: HandlerContext
): Promise<Response> {
  const { userId, text } = (await req.json()) as ApiSendChatMessagePayload;
  if (userId && text) {
    const chatMessage: ChatMessage = { id: generateRandomId(8), userId, text };
    storehouse.addMessage(chatMessage);
    const roomChannel = createRoomChannel();
    roomChannel.postMessage({ chatMessage });
    roomChannel.close();
    return new Response("ok");
  } else {
    return new Response("ng");
  }
}
