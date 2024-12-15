import * as React from "react";
import type { SVGProps } from "react";
const SvgEpic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#904EE2"
      d="M10.286 0H1.714C.768 0 0 .768 0 1.714v8.572C0 11.233.768 12 1.714 12h8.572c.947 0 1.714-.768 1.714-1.714V1.714C12 .768 11.232 0 10.286 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="m8.506 5.79-.002-.003a.41.41 0 0 0 .068-.217.429.429 0 0 0-.429-.428H6V2.999a.429.429 0 0 0-.428-.429.42.42 0 0 0-.348.191.427.427 0 0 0-.056.112l-1.67 3.329.002.003a.42.42 0 0 0-.071.222c0 .238.192.429.428.429H6v2.143a.423.423 0 0 0 .787.222h.003L6.8 9.2c.01-.018.02-.034.027-.053l1.679-3.355Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEpic;
