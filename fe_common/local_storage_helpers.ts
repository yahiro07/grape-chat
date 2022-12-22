// deno-lint-ignore ban-types
export function writeLocalStorageObject<T extends {}>(
  key: string,
  data: T,
) {
  localStorage.setItem(key, JSON.stringify(data));
}

// deno-lint-ignore ban-types
export function readLocalStorageObject<T extends {}>(
  key: string,
): T | undefined {
  const text = localStorage.getItem(key);
  if (text) {
    try {
      const obj = JSON.parse(text);
      return obj as T;
    } catch (err) {
      console.error(err);
    }
  }
  return undefined;
}
