import { css, solidify } from "../deps.ts";
import { Page } from "../fe_common/Page.tsx";
import { mqMedium, mqSmall } from "../fe_common/theme.ts";
import { uiConstants } from "../fe_common/ui_constants.ts";

export default function AboutPage() {
  return (
    <Page pagePath="/about">
      {solidify(
        <div>
          <DocumentContent />
        </div>,
        css`
          overflow-y: scroll;
        `,
      )}
    </Page>
  );
}

function DocumentContent() {
  return solidify(
    <div>
      <h1>{uiConstants.siteTitle}</h1>
      <h3>Overview</h3>
      <p>
        A chat application example built with Deno+Fresh+Resin CSS.
      </p>
      <p>
        Mainly focusing on demonstrating how the UI constructed with Resin.
      </p>

      <h3>Specifications</h3>
      <p>
        Unlike a typical chat UI, one can switch between two avatars to write a
        conversation alone :)
      </p>
      <p>
        Maximum 10 message logs are retained on the server. Any more than that
        will be discarded.
      </p>

      <h3>The UI</h3>
      <img
        class="image-ui"
        src="https://i.gyazo.com/41f87a242006276aedab6ab4c9fc8598.png"
      />
      <p>
        There are two avatar selection parts on either side of the chat input
        area. Clicking the icon selects the avatar to be used for speaking. The
        selected icon is highlighted with a blue border. You can switch avatar
        characters respectively by pressing the small button under the name.
      </p>

      <h3>Credits</h3>
      <p>
        The avatar charactor icons are adapted from FreePencil's website.
      </p>
      <p class="bannar-row">
        <a href="https://iconbu.com/" target="_blank">
          <img src="https://i.gyazo.com/4a4e071bfafa5674e0bdaa0b67e59da7.png" />
        </a>
        (Japanese Site)
      </p>

      <h3>Contact</h3>
      <p>
        If you have any problems or suggestions, please contact to the address
        below.
      </p>

      <p class="twitter">
        Twitter
        <a
          href="https://twitter.com/yahiro120"
          target="_blank"
          rel="noreferrer"
        >
          <img src="https://i.imgur.com/eeoh1bP.png" />
          @yahiro120
        </a>
      </p>
      <p class="mail">
        mail: yahiro1200
        <img src="https://i.gyazo.com/e54845878425c702a37b27c14c3587e2.png" />
      </p>

      <div class="github">
        <a href="https://github.com/yahiro07/grape_chat" target="_blank">
          <img src="https://i.imgur.com/I9addWI.png" />
        </a>
      </div>
    </div>,
    css`
      padding: 20px 20px 30px;
      font-size: 16px;
      width: 100%;

      background: #fff;
      position: relative;

      text-size-adjust: none;
      -webkit-text-size-adjust: none;
      touch-action: pan-y;

      > h1 {
        font-size: 40px;
        font-weight: bold;
        color: #428;
      }

      > h3 {
        color: #fff;
        background: #fac;
        padding: 6px;
        font-size: 22px;
        margin-top: 25px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        height: 36px;
        border-radius: 30px;

        &::before{
          content: '🍇';
          margin-top: -4px;
        }
      }

      > h1 + h3{
        margin-top: 20px;
      }

      > p {
        line-height: 1.5em;
        margin-left: 5px;
      }

      > .image-ui{
        max-width: 100%;
        margin-bottom: 5px;
      }

      > .bannar-row{
        margin-top: 10px;
        display: flex;
        gap: 5px;

        > a > img{
          max-width: 50vw;
        }
      }

      > .twitter{
        margin-top: 10px;
        display: flex;
        gap: 10px;
        > a{
          display: flex;
          gap: 10px;
          padding-right: 5px;
          align-items: center;
          border: solid 1px #aaa;
          border-radius: 4px;
          overflow: hidden;
          color: #444;
          > img{
            height: 36px;
          }
        }
      }

      > .mail {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 1px;
      }

      > div + div {
        margin-top: 10px;
      }

      > .github{
        position: absolute;
        top: 15px;
        right: 30px;
        > a > img{
          height: 50px;
        }
      }

      ${mqSmall}{
        padding: 20px 30px 30px;
      }

      ${mqMedium}{
        padding: 20px 40px 30px;
      }
    `,
  );
}
