import { css, solidify, useEffect, useState } from "../deps.ts";
import { apiBridge } from "../domain/api_bridge.ts";
import { ChatMessage } from "../domain/types.ts";
import { userProvider } from "../domain/user_provider.ts";

export default function ChatTimeline({
  initialMessages,
}: {
  initialMessages: ChatMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    return apiBridge.subscribeMessages((event) => {
      const { chatMessage } = event;
      if (chatMessage) {
        setMessages((prev) => [...prev, chatMessage]);
      }
    });
  }, []);

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

function Message({ message }: { message: ChatMessage }) {
  const user = userProvider.getUserById(message.userId);
  return solidify(
    <div key={message.id}>
      {message.text} <br />
      {user.name} <br />
      <img src={user.avatarUrl} />
    </div>,
    css`
      height: 200px;
      flex-shrink: 0;
      border: solid 1px blue;
    `
  );
}
