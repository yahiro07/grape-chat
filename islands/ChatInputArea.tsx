import { css, solidify, useState } from "../deps.ts";
import { apiBridge } from "../fe_common/api_bridge.ts";
import { reflectTextValue } from "../fe_common/form_helpers.ts";

export default function ChatInputArea() {
  const [text, setText] = useState("");

  const sendText = () => {
    apiBridge.sendChatMessage("user1", text);
    setText("");
  };
  return solidify(
    <div class="fc-chat-input-area">
      <textarea value={text} onInput={reflectTextValue(setText)} />
      <button onClick={sendText}>send</button>
    </div>,
    css`
      border: solid 2px green;
      height: 100px;
      padding: 10px;

      display: flex;
      align-items: flex-start;
      gap: 10px;

      > textarea {
        resize: none;
        width: 200px;
        height: 40px;
        padding: 5px;
      }

      > button {
        padding: 2px 10px;
      }
    `
  );
}
