import { css, solidify } from "resin/mod.ts";
import { ChatMessageView } from "../domain/types.ts";

export default function ChatTimeline({
  initialMessages,
}: {
  initialMessages: ChatMessageView[];
}) {
  const messages = initialMessages;

  return solidify(
    <div class="fc-chat-timeline">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>,
    css`
      border: solid 2px red;
      display: flex;
      flex-direction: column-reverse;
    `
  );
}

function Message({ message }: { message: ChatMessageView }) {
  return solidify(
    <div key={message.id}>
      {message.text} <br />
      {message.user.name} <br />
      <img src={message.user.avatarUrl} />
    </div>,
    css`
      height: 100px;
      border: solid 1px blue;
    `
  );
}
