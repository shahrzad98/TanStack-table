import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 4.167A.833.833 0 0 0 4.167 5v6.667A.833.833 0 0 0 5 12.5h.833V8.333a2.5 2.5 0 0 1 2.5-2.5H12.5V5a.833.833 0 0 0-.833-.833H5Zm9.167 1.666V5a2.5 2.5 0 0 0-2.5-2.5H5A2.5 2.5 0 0 0 2.5 5v6.667a2.5 2.5 0 0 0 2.5 2.5h.833V15a2.5 2.5 0 0 0 2.5 2.5H15a2.5 2.5 0 0 0 2.5-2.5V8.333a2.5 2.5 0 0 0-2.5-2.5h-.833ZM8.333 7.5a.833.833 0 0 0-.833.833V15a.833.833 0 0 0 .833.833H15a.834.834 0 0 0 .833-.833V8.333A.834.834 0 0 0 15 7.5H8.333Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCopy;
