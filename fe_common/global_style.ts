import { colors } from "./theme.ts";
import { css } from "../deps.ts";

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
    background: #F0F;
    color: #0F0;
    border: solid 1px #F00;

    &:focus{
      border: none;
      outline: solid 2px ${colors.controlHighlight};
    }
  }

  body, input, textarea, button{
    font-family: 'Rubik', sans-serif;
  }
`;
