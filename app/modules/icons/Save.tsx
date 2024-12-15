import * as React from "react";
import type { SVGProps } from "react";
const SvgSave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <path
      stroke="#2684FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.313}
      d="M16.625 18.375H4.375a1.75 1.75 0 0 1-1.75-1.75V4.375a1.75 1.75 0 0 1 1.75-1.75H14L18.375 7v9.625a1.75 1.75 0 0 1-1.75 1.75Z"
    />
    <path
      stroke="#2684FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.313}
      d="M14.875 18.375v-7h-8.75v7M6.125 2.625V7h7"
    />
  </svg>
);
export default SvgSave;
