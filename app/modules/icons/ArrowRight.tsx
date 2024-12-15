import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#5D6671"
      fillRule="evenodd"
      d="M10.5 2.207a.708.708 0 1 0-1 1.002l6.082 6.083H2.708a.708.708 0 1 0 0 1.417h12.874L9.5 16.792a.708.708 0 1 0 1.002 1.002l7.279-7.28a.706.706 0 0 0-.004-1.032l-7.275-7.275Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowRight;
