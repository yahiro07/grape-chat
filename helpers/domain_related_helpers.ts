export function generateRandomId(n: number) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(n)
    .fill(0)
    .map(() => chars.charAt((Math.random() * chars.length) >> 0))
    .join("");
}
