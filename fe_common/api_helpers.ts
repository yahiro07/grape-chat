export function postJson<T>(url: string, payload: T) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
