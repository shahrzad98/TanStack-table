import * as React from "react";
import type { SVGProps } from "react";
const SvgJiraEpic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#904EE2"
      d="M17.143 0H2.857A2.857 2.857 0 0 0 0 2.857v14.286A2.857 2.857 0 0 0 2.857 20h14.286A2.857 2.857 0 0 0 20 17.143V2.857A2.857 2.857 0 0 0 17.143 0Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="m14.176 9.652-.003-.005a.684.684 0 0 0 .113-.362.715.715 0 0 0-.714-.714h-3.571V4.999a.715.715 0 0 0-.715-.714.7.7 0 0 0-.578.319.711.711 0 0 0-.095.185l-2.782 5.549.002.004a.698.698 0 0 0-.118.372c0 .395.32.714.714.714h3.572v3.571c0 .396.32.715.714.715.256 0 .47-.142.597-.345l.004.002.019-.037c.016-.03.033-.057.044-.089l2.797-5.593Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgJiraEpic;
