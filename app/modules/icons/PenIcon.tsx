import * as React from "react";
import type { SVGProps } from "react";
const SvgPenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <path
      stroke="#5D6671"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.496}
      d="M12.218 1.62a2.114 2.114 0 1 1 2.99 2.99L5.114 14.708 1 15.828l1.122-4.113L12.218 1.62Z"
    />
  </svg>
);
export default SvgPenIcon;
