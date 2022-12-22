import { appConstants } from "./app_constants.ts";
import { ChatMessage } from "./types.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];

  const persistEnabled = Deno.env.get("ENABLE_CHAT_LOG_PERSISTENCE");
  const storageKey = "grape-chat-messages";

  function saveMessages() {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }

  function loadMessages() {
    const text = localStorage.getItem(storageKey);
    if (text) {
      try {
        const _messages = JSON.parse(text);
        messages.length = 0;
        messages.push(..._messages);
      } catch (error) {
        console.error(
          "an error occurred while loading persist messages, load skipped",
        );
        console.error(error);
      }
    }
  }
  if (persistEnabled) {
    loadMessages();
  }

  return {
    getMessages(): ChatMessage[] {
      return messages;
    },
    async addMessage(message: ChatMessage) {
      if (messages.length >= appConstants.maxChatLogCount) {
        messages.shift();
      }
      messages.push(message);
      if (persistEnabled) {
        await saveMessages();
      }
    },
  };
}

export const storehouse = createStorehouse();
