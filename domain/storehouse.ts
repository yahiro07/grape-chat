import { ChatMessage, ChatMessageView } from "./types.ts";
import { userProvider } from "./user_provider.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];
  if (1) {
    messages.push(
      { id: "m001", userId: "user1", text: "hello" },
      { id: "m002", userId: "user2", text: "world" }
    );
  }

  return {
    getMessages(): ChatMessageView[] {
      return messages.map((me) => ({
        id: me.id,
        user: userProvider.getUserById(me.userId)!,
        text: me.text,
      }));
    },
    addMessage(message: ChatMessage) {
      messages.push(message);
    },
  };
}

export const storehouse = createStorehouse();
