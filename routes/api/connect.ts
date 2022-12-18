import { Handlers } from "../../deps_backend.ts";
import { createRoomChannel } from "../../domain/room_channel.ts";
import { eventSourceResponse } from "../../core_helpers/event_source_response.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const roomChannel = createRoomChannel();
    return eventSourceResponse({
      onStart(enqueue) {
        roomChannel.subscribe((roomEvent) => {
          enqueue(`data: ${JSON.stringify(roomEvent)}\n\n`);
        });
      },
      onCancel() {
        roomChannel.close();
      },
    });
  },
};
