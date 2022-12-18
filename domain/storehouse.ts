import { ChatMessage } from "./types.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];
  if (1) {
    messages.push(
      { id: "abcxyz01", userId: "user1", text: "hello" },
      { id: "abcxyz02", userId: "user2", text: "world" },
      { id: "abcxyz03", userId: "user3", text: "hi" },
      { id: "abcxyz04", userId: "user4", text: "hi" }
    );
  }

  return {
    getMessages(): ChatMessage[] {
      return messages;
    },
    addMessage(message: ChatMessage) {
      messages.push(message);
    },
  };
}

export const storehouse = createStorehouse();
