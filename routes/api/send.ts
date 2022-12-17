import { storehouse } from "../../domain/storehouse.ts";
import { ApiSendChatMessagePayload } from "../../domain/types.ts";
import { generateRandomId } from "../../helpers/domain_related_helpers.ts";
import { HandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  _ctx: HandlerContext
): Promise<Response> {
  const { userId, text } = (await req.json()) as ApiSendChatMessagePayload;
  if (userId && text) {
    storehouse.addMessage({ id: generateRandomId(8), userId, text });
    return new Response("ok");
  } else {
    return new Response("ng");
  }
}
