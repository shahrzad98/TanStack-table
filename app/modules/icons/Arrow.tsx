import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <path
      stroke="#5D6671"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.417}
      d="M3.542 8.5h9.917M8.5 3.542 13.458 8.5 8.5 13.458"
    />
  </svg>
);
export default SvgArrow;
