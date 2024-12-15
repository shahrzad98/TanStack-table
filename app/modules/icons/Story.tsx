import * as React from "react";
import type { SVGProps } from "react";
const SvgStory = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#63BA3C"
      d="M10.286 0H1.714C.768 0 0 .768 0 1.714v8.572C0 11.233.768 12 1.714 12h8.572c.947 0 1.714-.768 1.714-1.714V1.714C12 .768 11.232 0 10.286 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7.714 2.572H4.286a.857.857 0 0 0-.857.857v5.572c0 .236.192.428.428.428a.42.42 0 0 0 .352-.198l.003.001 1.651-1.911a.172.172 0 0 1 .274 0l1.651 1.911h.004a.42.42 0 0 0 .351.197.429.429 0 0 0 .429-.428V3.429a.857.857 0 0 0-.858-.857Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgStory;
