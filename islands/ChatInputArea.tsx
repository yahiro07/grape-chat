import { css, solidify, useState } from "../deps.ts";
import { userProvider } from "../domain/user_provider.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { reflectTextValue } from "../fe_common/form_helpers.ts";

export default function ChatInputArea() {
  const [text, setText] = useState("");

  const allUsers = userProvider.getAllUsers();

  const [userIndex, setUserIndex] = useState(0);

  const swapUser = () => {
    const newIndex = (userIndex + 1) % allUsers.length;
    setUserIndex(newIndex);
  };

  const user = allUsers[userIndex];

  const sendText = () => {
    apiBridge.sendChatMessage(user.userId, text);
    setText("");
  };
  return solidify(
    <div class="fc-chat-input-area">
      <div class="avatar-part">
        <img src={user.avatarUrl} onClick={swapUser} />
        <div>{user.name}</div>
      </div>
      <div class="message-edit-part">
        <textarea value={text} onInput={reflectTextValue(setText)} />
        <button onClick={sendText}>send</button>
      </div>
    </div>,
    css`
      border: solid 2px green;
      padding: 10px;
      display: flex;

      > .avatar-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
          height: 100px;
          cursor: pointer;
        }
      }

      > .message-edit-part {
        display: flex;
        gap: 10px;

        > textarea {
          resize: none;
          width: 200px;
          height: 40px;
          padding: 5px;
        }

        > button {
          padding: 2px 10px;
          height: 40px;
        }
      }
    `
  );
}
