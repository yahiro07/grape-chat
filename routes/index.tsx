import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import { css, solidify } from "resin/mod.ts";
import { storehouse } from "../domain/storehouse.ts";
import { ChatMessage } from "../domain/types.ts";
import { Page } from "../fe_common/Page.tsx";
import ChatInputArea from "../islands/ChatInputArea.tsx";
import ChatTimeline from "../islands/ChatTimeline.tsx";
import { uiConstants } from "../fe_common/ui_constants.ts";
import { mqMedium, mqSmall } from "../fe_common/theme.ts";

interface Data {
  messages: ChatMessage[];
}

export const handler: Handler<Data> = (
  req: Request,
  ctx: HandlerContext<Data>,
) => {
  const messages = storehouse.getMessages();
  return ctx.render({ messages });
};

export default function IndexPage({ data }: PageProps<Data>) {
  return (
    <Page pagePath="/">
      <IndexPageContent messages={data.messages} />
    </Page>
  );
}

function IndexPageContent({ messages }: { messages: ChatMessage[] }) {
  return solidify(
    <main>
      <div class="bg-layer">
      </div>
      <div class="content-layer">
        <ChatTimeline initialMessages={messages} />
        <ChatInputArea />
      </div>
    </main>,
    css`
      width: 100%;
      height: 100%;
      position: relative;
      >*{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      > .bg-layer{
        background-image: url(${uiConstants.pageBackgroundImageUrl});
        background-size: 120px;
      }

      > .content-layer{
        display: flex;
        flex-direction: column;
        overflow-y: hidden;

        > .fc-chat-timeline {
          flex-grow: 1;
        }

        > .fc-chat-input-area {
          flex-shrink: 0;
        }
      }

      ${mqSmall}{
        > .bg-layer{
          background-size: 160px;
        }   
      }

      ${mqMedium}{
        > .bg-layer{
          background-size: 200px;
        }
      }

    `,
  );
}
