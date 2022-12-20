import { colors } from "./theme.ts";
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
    background: #eee;
    display: flex;
    justify-content: center;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea, button{
    &:focus{
      border: none;
      outline: solid 2px #0af;
    }
  }

  body, input, textarea, button{
    font-family: 'Rubik', sans-serif;
  }
`;
