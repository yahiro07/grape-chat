import { ComponentChildren } from "preact";
import {
  css,
  ResinCssEmitter,
  ResinCssGlobalStyle,
  solidify,
} from "../deps.ts";
import { Head } from "$fresh/runtime.ts";
import { globalStyle } from "./global_style.ts";
import { NavigationIcon } from "../components/NavigationIcon.tsx";
import { colors, pageMaxWidth } from "./theme.ts";
import { uiConstants } from "./ui_constants.ts";

interface Props {
  pagePath: string;
  children: ComponentChildren;
}

export function Page({ pagePath: currentPagePath, children }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{uiConstants.siteTitle}</title>

        <meta
          name="description"
          content="A chat application with double role conversation feature."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://grape-chat.deno.dev/" />
        <meta property="og:site_name" content="Grape Chat" />
        <meta property="og:title" content="Grape Chat" />
        <meta
          property="og:image"
          content="https://i.imgur.com/MIcbIGT.png"
        />
        <meta
          property="og:description"
          content="A chat application with double role conversation feature."
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Grape Chat" />
        <meta name="twitter:image" content="https://i.imgur.com/MIcbIGT.png" />
        <meta
          name="twitter:description"
          content="A chat application with double role conversation feature."
        />

        <script src="https://unpkg.com/phosphor-icons" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <ResinCssEmitter />
        <ResinCssGlobalStyle css={globalStyle} />
      </Head>
      {solidify(
        <div>
          <header>
            <HeaderContent currentPagePath={currentPagePath} />
          </header>
          <main>{children}</main>
          <footer>
            <FooterContent />
          </footer>
        </div>,
        css`
          width: 100%;
          max-width: ${pageMaxWidth};
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: solid 3px ${colors.headerBackground};

          > header {
            flex-shrink: 0;
          }

          > main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
          }

          > footer {
            flex-shrink: 0;
          }
        `,
      )}
    </>
  );
}

function HeaderContent({ currentPagePath }: { currentPagePath: string }) {
  return solidify(
    <div>
      <h1>
        <img src={uiConstants.siteTitleLogoUrl} />
        {uiConstants.siteTitle}
      </h1>
      <nav>
        <NavigationIcon
          iconSpec="ph-chats"
          pagePath="/"
          currentPagePath={currentPagePath}
        />
        <NavigationIcon
          iconSpec="ph-info"
          pagePath="/about"
          currentPagePath={currentPagePath}
        />
      </nav>
    </div>,
    css`
      background: ${colors.headerBackground};
      color: ${colors.white};
      display: flex;
      padding: 0 5px;

      > h1 {
        display: flex;
        align-items: center;
        padding: 2px 0;
        > img{
          height: 36px;
          margin-right: 4px;
        }
      }

      > nav {
        margin-left: auto;
        display: flex;
        align-items: center;
        display: flex;
        gap: 10px;
      }
    `,
  );
}

function FooterContent() {
  return solidify(
    <div>copyright ©2022 yahiro, all rights reserved.</div>,
    css`
      height: 30px;
      background: ${colors.footerBackground};
      color: ${colors.white};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
      font-size: 13px;
    `,
  );
}
