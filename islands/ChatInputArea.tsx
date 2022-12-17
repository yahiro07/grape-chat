import { css, solidify, useState } from "../deps.ts";
import { reflectTextValue } from "../helpers/form_helpers.ts";

export default function ChatInputArea() {
  const [text, setText] = useState("");

  const sendText = () => {
    console.log(`sending ${text}`);
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
