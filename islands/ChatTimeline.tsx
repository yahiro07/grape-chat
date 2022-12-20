import { css, solidify, useEffect, useState } from "../deps.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { ChatMessage } from "../domain/types.ts";
import { userProvider } from "../domain/user_provider.ts";
import { appConstants } from "../domain/app_constants.ts";
import { avatarSizes, mqMedium, mqSmall } from "../fe_common/theme.ts";

export default function ChatTimeline({
  initialMessages,
}: {
  initialMessages: ChatMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const addMessage = (msg: ChatMessage) => {
      setMessages((prevMessages) => {
        const newMessages = prevMessages.slice();
        if (newMessages.length >= appConstants.maxChatLogCount) {
          newMessages.shift();
        }
        newMessages.push(msg);
        return newMessages;
      });
    };
    return apiBridge.subscribeMessages((event) => {
      const { chatMessage } = event;
      if (chatMessage) {
        addMessage(chatMessage);
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
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
    `,
  );
}

function Message({ message }: { message: ChatMessage }) {
  const user = userProvider.getUserById(message.userId);
  return solidify(
    <div class={`--side-${message.side}`}>
      <div class="avatar-part">
        <img src={user.avatarUrl} />
        <div>{user.name}</div>
      </div>
      <div class="message-part">{message.text}</div>
      <div class="avatar-part">
        <img src={user.avatarUrl} class="--dummy" />
      </div>
    </div>,
    css`
      flex-shrink: 0;
      padding: 10px;
      display: flex;
      gap: 10px;
      &.--side-right{
        flex-direction: row-reverse;
      }
      > .avatar-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
          height: ${avatarSizes.XS};
          border-radius: 50%;
          &.--dummy{
            visibility: hidden;
          }
        }
      }
      > .message-part {
        flex-grow: 1;
        padding: 10px;
        border: solid 1px #f08;
        background: #fff;
        border-radius: 10px;
      }

      ${mqSmall} {
        > .avatar-part > img{ height: ${avatarSizes.S}; }
      }

      ${mqMedium} {
        > .avatar-part > img{ height: ${avatarSizes.M}; }
      }
    `,
  );
}
