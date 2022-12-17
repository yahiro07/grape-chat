import { css, solidify } from "../deps.ts";

export default function ChatInputArea() {
  return solidify(
    <div class="fc-chat-input-area"></div>,
    css`
      border: solid 2px green;
      height: 100px;
    `
  );
}
