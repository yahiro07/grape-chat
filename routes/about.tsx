import { css, solidify } from "../deps.ts";
import { Page } from "../helpers/Page.tsx";

export default function AboutPage() {
  return (
    <Page pagePath="/about">
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
  );
}
