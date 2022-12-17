import { css, solidify } from "../deps.ts";
import { ChatMessageView } from "../domain/types.ts";

export default function ChatTimeline({
  initialMessages,
}: {
  initialMessages: ChatMessageView[];
}) {
  const messages = initialMessages;
  const messagesReverseOrder = messages.slice().reverse();
  return solidify(
    <div class="fc-chat-timeline">
      {messagesReverseOrder.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>,
    css`
      border: solid 2px red;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
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
      height: 200px;
      flex-shrink: 0;
      border: solid 1px blue;
    `
  );
}
