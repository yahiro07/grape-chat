import { Head } from "$fresh/runtime.ts";
import {
  css,
  ResinCssEmitter,
  ResinCssGlobalStyle,
  solidify,
} from "../deps.ts";
import { globalStyles } from "../helpers/global_styles.ts";
import { Page } from "../helpers/Page.tsx";

export default function SecondPage() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <ResinCssEmitter />
        <ResinCssGlobalStyle css={globalStyles} />
      </Head>
      <Page>
        {solidify(
          <div>
            <div class="inner">aaa</div>
          </div>,
          css`
            overflow-y: scroll;
            border: solid 4px red;
            > .inner {
              width: 400px;
              height: 1600px;
              border: solid 4px blue;
            }
          `
        )}
      </Page>
    </>
  );
}
