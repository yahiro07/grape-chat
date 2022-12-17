import { Head } from "$fresh/runtime.ts";
import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import {
  css,
  ResinCssEmitter,
  ResinCssGlobalStyle,
  solidify,
} from "../deps.ts";
import { ChatMessageView } from "../domain/types.ts";
import ChatTimeline from "../islands/ChatTimeline.tsx";
import { storehouse } from "../domain/storehouse.ts";
import { globalStyles } from "../helpers/global_styles.ts";
import { Page } from "../helpers/Page.tsx";
import ChatInputArea from "../islands/ChatInputArea.tsx";

interface Data {
  messages: ChatMessageView[];
}

export const handler: Handler<Data> = (
  req: Request,
  ctx: HandlerContext<Data>
) => {
  const messages = storehouse.getMessages();
  return ctx.render({ messages });
};

export default function IndexPage({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <ResinCssEmitter />
        <ResinCssGlobalStyle css={globalStyles} />
      </Head>
      <Page>
        <IndexPageContent messages={data.messages} />
      </Page>
    </>
  );
}

function IndexPageContent({ messages }: { messages: ChatMessageView[] }) {
  return solidify(
    <main>
      <div class="site-instruction-part">
        <p>Site instruction goes here.</p>
      </div>
      <ChatTimeline initialMessages={messages} />
      <ChatInputArea />
    </main>,
    css`
      height: 100%;
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
    `
  );
}
