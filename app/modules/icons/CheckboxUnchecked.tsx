import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckboxUnchecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#5D6671"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.556}
      d="M13.444 1H2.556C1.696 1 1 1.696 1 2.556v10.888C1 14.304 1.696 15 2.556 15h10.888c.86 0 1.556-.696 1.556-1.556V2.556C15 1.696 14.304 1 13.444 1Z"
    />
  </svg>
);
export default SvgCheckboxUnchecked;
