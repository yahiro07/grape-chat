import { css, cx, solidify, useState } from "../deps.ts";
import { ChatUser, Side } from "../domain/types.ts";
import { userProvider } from "../domain/user_provider.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { reflectTextValue } from "../fe_common/form_helpers.ts";
import { avatarSizes, mqMedium, mqSmall } from "../fe_common/theme.ts";

const allUsers = userProvider.getAllUsers();

export default function ChatInputArea() {
  const [userIndexA, setUserIndexA] = useState(0);
  const [userIndexB, setUserIndexB] = useState(1);
  const [activeSide, setActiveSide] = useState<Side>("left");

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
      border-top: solid 1px #ccc;
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

  const sendText = () => {
    apiBridge.sendChatMessage(user.userId, text, side);
    setText("");
  };

  return solidify(
    <div class={className}>
      <textarea value={text} onInput={reflectTextValue(setText)} />
      <button onClick={sendText}>send</button>
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
        padding: 5px;
        border-radius: 6px;
      }

      > button {
        flex-shrink: 0;
        padding: 2px 10px;
        height: 30px;
        border: none;
        border-radius: 15px;
        cursor: pointer;
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
      class={cx(className, active && "--active")}
    >
      <img src={user.avatarUrl} onClick={setActive} />
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

      > img {
        height: ${avatarSizes.XS};
        border-radius: 50%;
        cursor: pointer;
        border: solid 2px transparent;
        transition: all 0.3s;
        &:hover {
          border-color: #0ae8;
        }
      }
      
      &.--active > img {
        border: solid 2px #0ae;
        box-shadow: 0 0 6px #0ae;
      }

      > .btn-swap {
        width: 25px;
        height: 25px;
        border: none;
        border-radius: 50%;
        background: #fa8;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          opacity: 0.7;
        }
      }

      ${mqSmall} {
        > img{ height: ${avatarSizes.S}; }
      }

      ${mqMedium} {
        > img{ height: ${avatarSizes.M}; }
      }
    `,
  );
}
