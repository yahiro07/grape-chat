export async function postJson<T>(url: string, payload: T) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
