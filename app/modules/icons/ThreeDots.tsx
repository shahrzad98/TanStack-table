import * as React from "react";
import type { SVGProps } from "react";
const SvgThreeDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <circle cx={10} cy={10} r={2} fill="#D9D9D9" />
    <circle cx={18} cy={10} r={2} fill="#D9D9D9" />
    <circle cx={2} cy={10} r={2} fill="#D9D9D9" />
  </svg>
);
export default SvgThreeDots;
