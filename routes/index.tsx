import { Handler, HandlerContext, PageProps } from "../deps_backend.ts";
import { css, solidify } from "../deps.ts";
import { storehouse } from "../domain/storehouse.ts";
import { ChatMessage } from "../domain/types.ts";
import { Page } from "../fe_common/Page.tsx";
import ChatInputArea from "../islands/ChatInputArea.tsx";
import ChatTimeline from "../islands/ChatTimeline.tsx";

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
        <div class="site-instruction-part">
          <p>Site instruction goes here.</p>
        </div>
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
        background: url('/bg.png');
        opacity: 0.3;
      }

      > .content-layer{
        border: solid 2px blue;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;

        > .site-instruction-part {
          flex-shrink: 0;
        }

        > .fc-chat-timeline {
          flex-grow: 1;
        }

        > .fc-chat-input-area {
          flex-shrink: 0;
        }
      }

    `,
  );
}
