import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckboxChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#2684FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.556}
      d="m6.889 10.073 2.333 2.333 4.813-4.813"
    />
    <path
      stroke="#2684FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.556}
      d="M15.444 3H4.556C3.696 3 3 3.696 3 4.556v10.888C3 16.304 3.696 17 4.556 17h10.888c.86 0 1.556-.696 1.556-1.556V4.556C17 3.696 16.304 3 15.444 3Z"
    />
  </svg>
);
export default SvgCheckboxChecked;
