import { ChatMessage, ChatMessageView } from "./types.ts";
import { userProvider } from "./user_provider.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];
  if (1) {
    messages.push(
      { id: "abcxyz01", userId: "user1", text: "hello" },
      { id: "abcxyz02", userId: "user2", text: "world" }
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
