import * as React from "react";
import type { SVGProps } from "react";
const SvgJiraArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <path
      stroke="#B5B5B5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.5 10h11.667M10.332 4.167 16.165 10l-5.833 5.834"
    />
  </svg>
);
export default SvgJiraArrow;
