import { css, solidify } from "resin/mod.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { ChatMessage } from "../domain/types.ts";
import { userProvider } from "../domain/user_provider.ts";
import { appConstants } from "../domain/app_constants.ts";
import { AvatarIcon } from "../components/AvatarIcon.tsx";
import { colors, mqMedium } from "../fe_common/theme.ts";

export default function ChatTimeline({
  initialMessages,
}: {
  initialMessages: ChatMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const refTimelineDiv = useRef<HTMLDivElement>(undefined!);

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
      setTimeout(() => {
        const timelineDiv = refTimelineDiv.current;
        timelineDiv.scrollTop = timelineDiv.scrollHeight;
      }, 200);
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
    <div class="fc-chat-timeline" ref={refTimelineDiv}>
      {messagesReverseOrder.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>,
    css`
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
      padding: 10px 0;
    `,
  );
}

function Message({ message }: { message: ChatMessage }) {
  const user = userProvider.getUserById(message.userId);
  return solidify(
    <div class={`--side-${message.side}`}>
      <div class="avatar-part">
        <AvatarIcon imageUrl={user.avatarUrl} />
        <div>{user.name}</div>
      </div>
      <div class="message-part">{message.text}</div>
      <div class="avatar-part --dummy">
        {/* placeholder */}
        <AvatarIcon imageUrl={user.avatarUrl} />
      </div>
    </div>,
    css`
      flex-shrink: 0;
      padding: 7px;
      display: flex;
      gap: 6px;
      &.--side-right{
        flex-direction: row-reverse;
      }
      > .avatar-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        &.--dummy{
          visibility: hidden;
        }
        margin-bottom: -10px;
      }
      > .message-part {
        flex-grow: 1;
        padding: 10px;
        border: solid 1px ${colors.messageBalloonEdge};
        background: ${colors.messageBalloonFill};
        border-radius: 12px;
        white-space: pre-wrap;
      }

      ${mqMedium}{
        padding: 8px 10px;
        gap: 10px;
        > .avatar-part{
          margin-bottom: 0;
        }
      }
    `,
  );
}
