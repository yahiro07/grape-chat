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

  const logFilePath = ".data/chat-log.json";

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
    } catch (error) {}
  }
  loadMessagesFromFile();

  return {
    getMessages(): ChatMessage[] {
      return messages;
    },
    async addMessage(message: ChatMessage) {
      if (messages.length >= appConstants.maxChatLogCount) {
        messages.shift();
      }
      messages.push(message);
      await saveMessagesToFile();
    },
  };
}

export const storehouse = createStorehouse();
