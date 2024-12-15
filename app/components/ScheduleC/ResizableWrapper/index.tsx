import {
  useRef,
  useEffect,
  FC,
  PropsWithChildren,
  Children,
  cloneElement,
  useState,
  isValidElement,
  ReactElement,
} from "react";
import styled from "@emotion/styled";

const WrapperStyled = styled("div")({
  ".resizeable": {
    position: "absolute",
    bottom: 60,
    width: "95%",
    minHeight: "290px",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "15px",
  },

  ".resizer-top": {
    zIndex: 9,
    position: "absolute",
    cursor: `url(/verticalCursor.svg) 24 24, auto`,
    height: "2px",
    left: "0",
    top: 0,
    width: "100%",
  },
});

export const ResizableWrapper: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refTop = useRef<HTMLDivElement | null>(null);
  const [heightProps, setHeightProps] = useState(0);
  let height: number;
  useEffect(() => {
    const resizeableElement = ref.current;
    if (resizeableElement) {
      const styles = window.getComputedStyle(resizeableElement);
      height = parseInt(styles.height, 10);
      setHeightProps(parseInt(styles.height, 10));
    }
    let y = 0;

    const onMouseMoveTopResize = (event: MouseEvent) => {
      const dy = event.clientY - y;
      height = height - dy;
      setHeightProps(height - dy);
      y = event.clientY;
      if (resizeableElement && resizeableElement) {
        resizeableElement.style.height = `${height}px`;
      }
    };

    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event: MouseEvent) => {
      y = event.clientY;
      if (resizeableElement) {
        const styles = window.getComputedStyle(resizeableElement);
        resizeableElement.style.bottom = styles.bottom;
        resizeableElement.style.top = "null";
      }
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    const resizerTop = refTop.current;
    resizerTop &&
      resizerTop.addEventListener("mousedown", onMouseDownTopResize);

    return () => {
      resizerTop?.removeEventListener("mousedown", onMouseDownTopResize);
    };
  }, []);

  interface ChildProps {
    height: number;
  }

  return (
    <WrapperStyled>
      <div ref={ref} className="resizeable">
        <div ref={refTop} className="resizer-top" />
        {Children.map(children as ReactElement<ChildProps>[], (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              height: heightProps,
            });
          }
        })}
      </div>
    </WrapperStyled>
  );
};
