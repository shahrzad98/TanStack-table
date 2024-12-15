import * as React from "react";
import type { SVGProps } from "react";
const SvgCursor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      fill="#699BF7"
      d="M9.629 7.291h2.083v4.167h.005v2.083h-.005v4.167H9.629V13.54H5.03l1.905 1.905-1.473 1.473-4.42-4.42 4.42-4.42 1.473 1.474-1.905 1.905h4.598V7.29ZM15.889 7.291h-2.083v4.167H13.8v2.083h.006v4.167h2.083V13.54h4.598l-1.904 1.905 1.473 1.473 4.42-4.42-4.42-4.42-1.474 1.474 1.905 1.905H15.89V7.29Z"
    />
  </svg>
);
export default SvgCursor;
