import { ComponentChildren } from "preact";
import {
  css,
  ResinCssEmitter,
  ResinCssGlobalStyle,
  solidify,
} from "../deps.ts";
import { Head } from "$fresh/runtime.ts";
import { globalStyles } from "./global_styles.ts";
import { NavigationIcon } from "../components/NavigationIcon.tsx";
import { colors, pageMaxWidth } from "./theme.ts";

interface Props {
  pagePath: string;
  children: ComponentChildren;
}

export function Page({ pagePath: currentPagePath, children }: Props) {
  return (
    <>
      <Head>
        <title>Nantoka Chat</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script src="https://unpkg.com/phosphor-icons" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel="stylesheet"
        />
        <ResinCssEmitter />
        <ResinCssGlobalStyle css={globalStyles} />
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
        <i class="ph-sparkle" />
        Nantoka Chat
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
      color: ${colors.textLight};
      display: flex;
      padding: 0 5px;

      > h1 {
        display: flex;
        > i {
          margin-top: 4px;
          margin-right: 6px;
          font-size: 36px;
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
      color: ${colors.textLight};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
      font-size: 14px;
    `,
  );
}
