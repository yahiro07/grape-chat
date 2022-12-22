import { appConstants } from "./app_constants.ts";
import { ChatMessage } from "./types.ts";

function createStorehouse() {
  const messages: ChatMessage[] = [];

  const logFilePath = ".data/chat-log.json";
  const persistEnabled = Deno.env.get("ENABLE_CHAT_LOG_PERSISTENCE");

  async function saveMessagesToFile() {
    const text = JSON.stringify(messages, null, " ");
    const folder = logFilePath.split("/")[0];
    await Deno.mkdir(folder, { recursive: true });
    await Deno.writeTextFile(logFilePath, text);
  }

  async function loadMessagesFromFile() {
    try {
      const text = await Deno.readTextFile(logFilePath);
      const _messages = JSON.parse(text);
      messages.length = 0;
      messages.push(..._messages);
    } catch (_) {
      //ignore errors
    }
  }
  if (persistEnabled) {
    loadMessagesFromFile();
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
        await saveMessagesToFile();
      }
    },
  };
}

export const storehouse = createStorehouse();
