import { css, cx, solidify } from "../deps.ts";
import { avatarSizes, mqMedium, mqSmall } from "../fe_common/theme.ts";

type Props = {
  imageUrl: string;
  canSelect?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export function AvatarIcon(
  { imageUrl, canSelect, selected, onClick }: Props,
) {
  return solidify(
    <img
      class={cx(canSelect && "--can-select", selected && "--selected")}
      src={imageUrl}
      onClick={onClick}
    />,
    css`
      height: ${avatarSizes.XS};
      border-radius: 50%;
      border: solid 1px #4688;

      &.--can-select{
        cursor: pointer;
        border: solid 2px #ccc;
        transition: all 0.3s;
        &:hover {
          border-color: #0ae8;
        }
      }

      &.--selected{
        border: solid 2px #0ae;
        box-shadow: 0 0 8px #0ae; 
      }

      ${mqSmall} {
        height: ${avatarSizes.S};
      }

      ${mqMedium} {
        height: ${avatarSizes.M};
      }
    `,
  );
}
