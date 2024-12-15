import * as React from "react";
import type { SVGProps } from "react";
const SvgSubtask = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#4BAEE8"
      d="M10.286 0H1.714C.768 0 0 .768 0 1.714v8.572C0 11.233.768 12 1.714 12h8.572c.947 0 1.714-.768 1.714-1.714V1.714C12 .768 11.232 0 10.286 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M3.083 2.833a.25.25 0 0 0-.25.25v2.834c0 .138.112.25.25.25h2.834a.25.25 0 0 0 .25-.25V3.083a.25.25 0 0 0-.25-.25H3.083ZM2 3.083C2 2.485 2.485 2 3.083 2h2.834C6.515 2 7 2.485 7 3.083v2.834C7 6.515 6.515 7 5.917 7H3.083A1.083 1.083 0 0 1 2 5.917V3.083Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M5.83 4.715c-.616 0-1.115.499-1.115 1.114v2.914c0 .616.499 1.115 1.114 1.115h2.914c.616 0 1.115-.5 1.115-1.115V5.83c0-.615-.5-1.114-1.115-1.114H5.83Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSubtask;
