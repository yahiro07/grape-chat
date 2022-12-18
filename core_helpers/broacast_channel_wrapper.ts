export function createBroadcastChannelWrapper<T>(name: string) {
  const channel = new BroadcastChannel(name);
  return {
    subscribe(handler: (payload: T) => void) {
      const listener = (e: MessageEvent) => handler(e.data);
      channel.addEventListener("message", listener);
      return {
        unsubscribe() {
          channel.removeEventListener("message", listener);
        },
      };
    },
    postMessage(message: T) {
      channel.postMessage(message);
    },
    close() {
      channel.close();
    },
  };
}
