import * as React from "react";
import type { SVGProps } from "react";
const SvgBug = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#E5493A"
      d="M10.286 0H1.714C.768 0 0 .768 0 1.714v8.572C0 11.233.768 12 1.714 12h8.572c.947 0 1.714-.768 1.714-1.714V1.714C12 .768 11.232 0 10.286 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M8.572 6a2.571 2.571 0 1 1-5.143 0 2.571 2.571 0 0 1 5.143 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgBug;
