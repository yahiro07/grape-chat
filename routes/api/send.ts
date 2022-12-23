import { HandlerContext } from "$fresh/server.ts";
import { createRoomChannel } from "../../domain/room_channel.ts";
import { storehouse } from "../../domain/storehouse.ts";
import { ApiSendChatMessagePayload, ChatMessage } from "../../domain/types.ts";
import { generateRandomId } from "../../core_helpers/domain_related_helpers.ts";
import { userProvider } from "../../domain/user_provider.ts";
import { appConstants } from "../../domain/app_constants.ts";

const allUsers = userProvider.getAllUsers();

export async function handler(
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> {
  const { userId, text, side } =
    (await req.json()) as ApiSendChatMessagePayload;

  const valid = userId && allUsers.some((user) => user.userId === userId) &&
    text && typeof (text) === "string" &&
    (1 <= text.length && text.length < appConstants.maxMessageTextLength) &&
    (side == "left" || side === "right");

  if (valid) {
    const id = generateRandomId(8);
    const chatMessage: ChatMessage = { id, userId, text, side };
    await storehouse.addMessage(chatMessage);
    const roomChannel = createRoomChannel();
    roomChannel.postMessage({ chatMessage });
    roomChannel.close();
    return new Response("ok");
  } else {
    return new Response("ng");
  }
}
