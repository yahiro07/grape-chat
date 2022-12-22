// deno-lint-ignore-file require-await
import { connect } from "redis/mod.ts";

export type PersistenceAdapter = {
  load(): Promise<string | null>;
  save(text: string): Promise<void>;
};

export async function createPersistenceAdapter_localStorage(
  key: string,
): Promise<PersistenceAdapter> {
  return {
    async load() {
      return localStorage.getItem(key);
    },
    async save(text: string) {
      localStorage.setItem(key, text);
    },
  };
}

export async function createPersistenceAdapter_redis(
  key: string,
): Promise<PersistenceAdapter> {
  const redis = await connect({ hostname: "127.0.0.1", port: 6379 });
  return {
    async load() {
      return await redis.get(key);
    },
    async save(text: string) {
      await redis.set(key, text);
    },
  };
}

export async function createPersistenceAdapter_none(
  _key: string,
): Promise<PersistenceAdapter> {
  return {
    async load() {
      return null;
    },
    async save(_text: string) {},
  };
}
