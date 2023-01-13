import { css, domStyled } from 'resin/mod.ts';

type Props = {
  iconSpec: string;
  pagePath: string;
  currentPagePath: string;
};

export function NavigationIcon({ iconSpec, pagePath, currentPagePath }: Props) {
  const isActive = pagePath === currentPagePath;
  return domStyled(
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
    `,
  );
}
