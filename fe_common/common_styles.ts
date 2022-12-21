import { css } from "../deps.ts";

export const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;
