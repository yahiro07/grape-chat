import { css, solidify } from "resin/mod.ts";
import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export function Page({ children }: Props) {
  return solidify(
    <div>
      <header>
        <h1>Nantoka Chat</h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>,
    css`
      border: solid 3px orange;
      height: 100%;
      display: flex;
      flex-direction: column;

      > header {
        flex-shrink: 0;
        background: orange;
        color: white;
      }

      > main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
      }

      > footer {
        flex-shrink: 0;
        height: 20px;
        background: #444;
      }
    `
  );
}
