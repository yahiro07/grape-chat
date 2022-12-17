import { colors } from "../base/ui_theme.ts";
import { css } from "../deps.ts";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body {
    height: 100%;
  }

  body {
    color: ${colors.textDark};
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
