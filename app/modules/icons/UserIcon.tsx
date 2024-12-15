import * as React from "react";
import type { SVGProps } from "react";
const SvgUserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={41}
    fill="none"
    viewBox="0 0 41 41"
    {...props}
  >
    <circle cx={20.5} cy={20.5} r={20.5} fill="#A0BDF2" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.53}
      strokeWidth={2.506}
      d="M30.522 31.775v-2.506a5.011 5.011 0 0 0-5.01-5.01H15.488a5.012 5.012 0 0 0-5.011 5.01v2.506M20.5 19.247a5.011 5.011 0 1 0 0-10.022 5.011 5.011 0 0 0 0 10.022Z"
    />
  </svg>
);
export default SvgUserIcon;
