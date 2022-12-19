import { appConstants } from "./app_constants.ts";
import { ChatMessage } from "./types.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];
  if (1) {
    messages.push(
      { id: "abcxyz01", userId: "user1", text: "hello", side: "left" },
      { id: "abcxyz02", userId: "user2", text: "world", side: "right" },
      { id: "abcxyz03", userId: "user3", text: "hi", side: "left" },
      { id: "abcxyz04", userId: "user4", text: "hi", side: "right" },
    );
  }

  return {
    getMessages(): ChatMessage[] {
      return messages;
    },
    addMessage(message: ChatMessage) {
      if (messages.length >= appConstants.maxChatLogCount) {
        messages.shift();
      }
      messages.push(message);
    },
  };
}

export const storehouse = createStorehouse();
