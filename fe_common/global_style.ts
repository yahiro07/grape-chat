import { colors } from "./theme.ts";
import { css } from "resin/mod.ts";

export const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html{
    position: fixed;
    overflow: hidden;
    width: 100%;
  }

  html,
  body {
    height: 100%;
  }

  body {
    color: ${colors.liteBlack};
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
      outline: solid 2px ${colors.controlHighlight};
    }
  }

  body, input, textarea, button{
    font-family: 'Rubik', sans-serif;
  }
`;
