import * as React from "react";
import type { SVGProps } from "react";
const SvgToggl = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#E57CD8"
      d="M10 15.373a5.121 5.121 0 0 1-1.353-10.06v1.49a3.707 3.707 0 1 0 2.706 0v-1.49a5.122 5.122 0 0 1-1.354 10.06ZM9.263 3.602h1.472v7.297H9.264V3.602ZM10 0a10 10 0 1 0 .002 20 10 10 0 0 0-.002-20Z"
    />
  </svg>
);
export default SvgToggl;
