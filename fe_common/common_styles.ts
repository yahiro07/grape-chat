import { css } from 'resin/mod.ts';

export const commonButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:not(:disabled):hover {
    opacity: 0.75;
  }
`;
