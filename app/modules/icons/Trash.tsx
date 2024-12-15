import * as React from "react";
import type { SVGProps } from "react";
const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.14 3.94a.65.65 0 0 1 .46-.19h2.8a.65.65 0 0 1 .65.65v.65h-4.1V4.4a.65.65 0 0 1 .19-.46ZM6.45 5.05V4.4A2.15 2.15 0 0 1 8.6 2.25h2.8a2.15 2.15 0 0 1 2.15 2.15v.65h2.749a.75.75 0 0 1 0 1.5h-.65v9.05a2.15 2.15 0 0 1-2.15 2.15h-7a2.15 2.15 0 0 1-2.15-2.15V6.55H3.7a.75.75 0 0 1 0-1.5h2.75Zm-.6 1.5v9.05a.65.65 0 0 0 .65.65h7a.65.65 0 0 0 .65-.65V6.55h-8.3Zm2.75 2a.75.75 0 0 1 .75.75v4.2a.75.75 0 1 1-1.5 0V9.3a.75.75 0 0 1 .75-.75Zm3.55.75a.75.75 0 0 0-1.5 0v4.2a.75.75 0 1 0 1.5 0V9.3Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTrash;
