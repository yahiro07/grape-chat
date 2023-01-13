export function eventSourceResponse(callbacks: {
  onStart(enqueue: (body: string) => void): void;
  onCancel(): void;
}) {
  const stream = new ReadableStream({
    start(controller) {
      callbacks.onStart(controller.enqueue.bind(controller));
    },
    cancel() {
      callbacks.onCancel();
    },
  });
  return new Response(stream.pipeThrough(new TextEncoderStream()), {
    headers: { 'content-type': 'text/event-stream' },
  });
}
