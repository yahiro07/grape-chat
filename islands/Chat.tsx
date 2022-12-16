import { css, solidify } from "resin/mod.ts";
import { ChatMessageView } from "../domain/types.ts";

export default function Chat({
  initialMessages,
}: {
  initialMessages: ChatMessageView[];
}) {
  const messages = initialMessages;

  return solidify(
    <div class="fc-chat">
      {messages.map((message) => (
        <div key={message.id}>
          {message.text}
          {message.user.name}
          {message.user.avatarUrl}
        </div>
      ))}
    </div>,
    css`
      border: solid 1px red;
    `
  );
}
