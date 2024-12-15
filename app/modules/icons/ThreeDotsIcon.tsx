import * as React from "react";
import type { SVGProps } from "react";
const SvgThreeDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={4}
    fill="none"
    viewBox="0 0 20 4"
    {...props}
  >
    <circle cx={2} cy={2} r={2} fill="#D9D9D9" transform="rotate(-90 2 2)" />
    <circle cx={10} cy={2} r={2} fill="#D9D9D9" transform="rotate(-90 10 2)" />
    <circle cx={18} cy={2} r={2} fill="#D9D9D9" transform="rotate(-90 18 2)" />
  </svg>
);
export default SvgThreeDotsIcon;
