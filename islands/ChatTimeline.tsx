import { css, solidify, useEffect, useState } from "../deps.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
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
      <div class="avatar-part">
        <img src={user.avatarUrl} />
        <div>{user.name}</div>
      </div>
      <div class="message-part">{message.text}</div>
    </div>,
    css`
      flex-shrink: 0;
      padding: 10px;
      display: flex;
      /* border: solid 1px blue; */
      > .avatar-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
          height: 100px;
        }
      }
      > .message-part {
        flex-grow: 1;
        margin-left: 10px;
        padding: 10px;
        border: solid 1px #f08;
        border-radius: 10px;
      }
    `
  );
}
