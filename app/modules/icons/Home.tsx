import * as React from "react";
import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#B5B5B5"
      fillRule="evenodd"
      d="M11.152 2.752a1.2 1.2 0 0 1 1.697 0l8.4 8.4A1.2 1.2 0 0 1 20.4 13.2h-1.2v7.2a1.2 1.2 0 0 1-1.2 1.2h-2.4a1.2 1.2 0 0 1-1.2-1.2v-3.6a1.2 1.2 0 0 0-1.2-1.2h-2.4a1.2 1.2 0 0 0-1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H6a1.2 1.2 0 0 1-1.2-1.2v-7.2H3.6a1.2 1.2 0 0 1-.848-2.048l8.4-8.4Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHome;
