import { Head } from "$fresh/runtime.ts";
import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import {
  css,
  ResinCssEmitter,
  ResinCssGlobalStyle,
  solidify,
} from "resin/mod.ts";
import { ChatMessageView } from "../domain/types.ts";
import Chat from "../islands/Chat.tsx";
import { storehouse } from "../domain/storehouse.ts";
import { globalStyles } from "../helpers/global_styles.ts";
import { Page } from "../helpers/Page.tsx";

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
    <div>
      <p>Site instruction goes here.</p>
      <Chat initialMessages={messages} />
    </div>,
    css`
      height: 100%;
      border: solid 2px blue;
    `
  );
}
