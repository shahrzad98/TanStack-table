import * as React from "react";
import type { SVGProps } from "react";
const SvgJira = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#2684FF"
      d="M19.76 9.44 10.863.834 10 0 3.302 6.478.239 9.44A.779.779 0 0 0 0 10c0 .21.086.411.24.56l6.119 5.918L10 20l6.698-6.478.104-.1 2.959-2.862A.779.779 0 0 0 20 10a.779.779 0 0 0-.24-.56ZM10 12.957 6.943 10 10 7.043 13.057 10 10 12.957Z"
    />
    <path
      fill="url(#a)"
      d="M10 7.043a4.898 4.898 0 0 1-1.507-3.505A4.896 4.896 0 0 1 9.98.023l-6.69 6.468 3.641 3.522L10 7.043Z"
    />
    <path
      fill="url(#b)"
      d="M13.065 9.992 10 12.957a4.973 4.973 0 0 1 1.117 1.615 4.838 4.838 0 0 1 0 3.813A4.973 4.973 0 0 1 10 20l6.706-6.486-3.64-3.522Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={9.455}
        x2={5.328}
        y1={4.052}
        y2={8.318}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.18} stopColor="#0052CC" />
        <stop offset={1} stopColor="#2684FF" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={270.069}
        x2={414.559}
        y1={613.27}
        y2={516.448}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.18} stopColor="#0052CC" />
        <stop offset={1} stopColor="#2684FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgJira;
