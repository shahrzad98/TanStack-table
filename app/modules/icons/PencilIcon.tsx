import * as React from "react";
import type { SVGProps } from "react";
const SvgPencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#5D6671"
      d="M11.416 1.2A2.393 2.393 0 0 1 14.8 4.585l-.917.915-3.386-3.383.918-.917ZM9.616 3 2.17 10.444a2.063 2.063 0 0 0-.498.805L.531 14.677a.625.625 0 0 0 .79.79l3.429-1.142c.303-.1.578-.271.805-.498L13 6.385 9.615 3Z"
    />
  </svg>
);
export default SvgPencilIcon;
