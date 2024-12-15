import * as React from "react";
import type { SVGProps } from "react";
const SvgTask = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#4BADE8"
      d="M10.286 0H1.714C.768 0 0 .768 0 1.714v8.572C0 11.233.768 12 1.714 12h8.572c.947 0 1.714-.768 1.714-1.714V1.714C12 .768 11.232 0 10.286 0Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M5.143 8.143 8.57 3.857M5.143 8.144 3.429 6.43"
    />
  </svg>
);
export default SvgTask;
