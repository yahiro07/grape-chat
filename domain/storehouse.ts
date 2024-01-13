import { appConstants } from "./app_constants.ts";
import {
  createPersistenceAdapter_localStorage,
  createPersistenceAdapter_none,
  createPersistenceAdapter_redis,
  PersistenceAdapter,
} from "./persistence_adapters.ts";
import { ChatMessage } from "./types.ts";

async function createPersistenceAdapter(): Promise<PersistenceAdapter> {
  const storageKey = "grape-chat-messages";
  const persistenceScheme =
    Deno.env.get("CHAT_LOG_PERSISTENCE_SCHEME") ?? "none";
  const creator =
    {
      none: createPersistenceAdapter_none,
      local_storage: createPersistenceAdapter_localStorage,
      redis: createPersistenceAdapter_redis,
    }[persistenceScheme] || createPersistenceAdapter_none;

  return await creator(storageKey);
}

async function createStorehouse() {
  const messages: ChatMessage[] = [];

  const persistenceAdapter = await createPersistenceAdapter();

  async function savePersistMessages() {
    await persistenceAdapter.save(JSON.stringify(messages));
  }

  async function loadPersistMessages() {
    const text = await persistenceAdapter.load();
    if (text) {
      try {
        const _messages = JSON.parse(text);
        messages.length = 0;
        messages.push(..._messages);
      } catch (error) {
        console.error(
          "an error occurred while loading persist messages, load skipped"
        );
        console.error(error);
      }
    }
  }

  loadPersistMessages();

  return {
    getMessages(): ChatMessage[] {
      return messages;
    },
    async addMessage(message: ChatMessage) {
      if (messages.length >= appConstants.maxChatLogCount) {
        messages.shift();
      }
      messages.push(message);
      await savePersistMessages();
    },
  };
}

export const storehouse = await createStorehouse();
