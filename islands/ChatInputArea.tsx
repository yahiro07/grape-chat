import { AvatarIcon } from "../components/AvatarIcon.tsx";
import { css, cx, solidify, useEffect, useState } from "../deps.ts";
import { appConstants } from "../domain/app_constants.ts";
import { ChatUser, Side } from "../domain/types.ts";
import { userProvider } from "../domain/user_provider.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { commonButtonStyle } from "../fe_common/common_styles.ts";
import { reflectTextValue } from "../fe_common/form_helpers.ts";
import {
  readLocalStorageObject,
  writeLocalStorageObject,
} from "../fe_common/local_storage_helpers.ts";
import { colors } from "../fe_common/theme.ts";

const allUsers = userProvider.getAllUsers();

type AvatarSelectionPersistData = {
  userIndexA: number;
  userIndexB: number;
  activeSide: Side;
};
const localStorageKey = `grape_chat_avatar_selection_state`;

export default function ChatInputArea() {
  const [userIndexA, setUserIndexA] = useState(0);
  const [userIndexB, setUserIndexB] = useState(1);
  const [activeSide, setActiveSide] = useState<Side>("left");

  useEffect(() => {
    const data = readLocalStorageObject<AvatarSelectionPersistData>(
      localStorageKey,
    );
    if (data) {
      setUserIndexA(data.userIndexA ?? 0);
      setUserIndexB(data.userIndexB ?? 1);
      setActiveSide(data.activeSide ?? "left");
    }
  }, []);

  useEffect(() => {
    writeLocalStorageObject<AvatarSelectionPersistData>(localStorageKey, {
      userIndexA,
      userIndexB,
      activeSide,
    });
  }, [userIndexA, userIndexB, activeSide]);

  const userIndex = activeSide === "left" ? userIndexA : userIndexB;
  return solidify(
    <div class="fc-chat-input-area">
      <AvatarSelector
        className="avatar-part-left"
        side="left"
        userIndex={userIndexA}
        setUserIndex={setUserIndexA}
        active={activeSide === "left"}
        setActive={() => setActiveSide("left")}
      />
      <MessageEditPart user={allUsers[userIndex]} side={activeSide} />
      <AvatarSelector
        className="avatar-part-right"
        side="right"
        userIndex={userIndexB}
        setUserIndex={setUserIndexB}
        active={activeSide === "right"}
        setActive={() => setActiveSide("right")}
      />
    </div>,
    css`
      border-top: solid 1px ${colors.uiAreaSplitter};
      padding: 10px;
      display: flex;
      gap: 10px;
    `,
  );
}

function MessageEditPart({
  className,
  user,
  side,
}: {
  className?: string;
  user: ChatUser;
  side: Side;
}) {
  const [text, setText] = useState("");

  const textValid =
    (1 <= text.length && text.length < appConstants.maxMessageTextLength);

  const sendText = () => {
    if (text.trim()) {
      apiBridge.sendChatMessage(user.userId, text, side);
      setText("");
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendText();
    }
  };

  return solidify(
    <div class={className}>
      <textarea
        value={text}
        onInput={reflectTextValue(setText)}
        onKeyUp={onKeyUp}
      />
      <button onClick={sendText} disabled={!textValid}>
        <i class="ph-paper-plane-right-fill" />
        send
      </button>
    </div>,
    css`
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;

      > textarea {  
        flex-grow: 1;
        width: 100%;
        resize: none;
        border: solid 1px ${colors.chatInputTextAreaEdge};
        padding: 10px;
        border-radius: 8px;
        font-size: 16px;
        background: ${colors.messageBalloonFill};
        color: ${colors.liteBlack};

        &:focus{
          border: solid 2px ${colors.controlHighlight};
          outline: none;
        }
      }

      > button {
        flex-shrink: 0;
        padding: 2px 10px;
        height: 30px;
        border: none;
        border-radius: 15px;
        font-size: 16px;
        color: ${colors.white};
        background: ${colors.sendButton};
        ${commonButtonStyle};
        gap: 2px;

        &:disabled{
          background: ${colors.sendButtonInactive};
        }
        &:not(:disabled):hover {
          background: ${colors.sendButton};
          font-size: 17px;
          opacity: 1;
        }
      }
    `,
  );
}

function AvatarSelector({
  className,
  side,
  userIndex,
  setUserIndex,
  active,
  setActive,
}: {
  className?: string;
  side: Side;
  userIndex: number;
  setUserIndex(index: number): void;
  active: boolean;
  setActive(): void;
}) {
  const user = allUsers[userIndex];

  const shiftUser = (dir: number) => {
    const newIndex = (userIndex + dir + allUsers.length) % allUsers.length;
    setUserIndex(newIndex);
  };

  return solidify(
    <div
      class={cx(className)}
    >
      <AvatarIcon
        imageUrl={user.avatarUrl}
        onClick={setActive}
        canSelect
        selected={active}
      />
      <div>{user.name}</div>
      <button class="btn-swap" onClick={() => shiftUser(1)}>
        <i class="ph-arrows-clockwise" />
      </button>
    </div>,
    css`
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      user-select: none;

      > .btn-swap {
        width: 25px;
        height: 25px;
        border: none;
        border-radius: 50%;
        background: ${colors.swapButton};
        color: ${colors.white};
        font-size: 16px;
        ${commonButtonStyle};
      }
    `,
  );
}
