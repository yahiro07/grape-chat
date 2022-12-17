import { css, solidify } from "../deps.ts";

type Props = {
  iconSpec: string;
  pagePath: string;
  currentPagePath: string;
};

export function NavigationIcon({ iconSpec, pagePath, currentPagePath }: Props) {
  const isActive = pagePath === currentPagePath;
  return solidify(
    <a href={pagePath}>
      <i class={iconSpec} data-active={isActive} />
    </a>,
    css`
      display: flex;
      align-items: center;

      > i {
        font-size: 28px;
        cursor: pointer;

        &[data-active] {
          font-size: 36px;
        }
      }
    `
  );
}
