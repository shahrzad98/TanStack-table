import { Typography } from "antd";
import styled from "@emotion/styled";
import { FC, useState, MouseEvent } from "react";
import clsx from "clsx";

const WrapperStyled = styled("div")({
  ".navigationContainer": {
    transform: "rotate(-135deg)",
    position: "absolute",
    left: "50%",
    bottom: "0",
    ".ant-typography": {
      userSelect: "none",
    },
  },
  ".title": {
    color: "#fff",
    left: "126px",
    position: "absolute",
    width: "46px",
  },

  ".title1": {
    left: "126px",
    top: "21px",
    transform: "rotate(42deg)",
  },

  ".title2": {
    left: "100px",
    top: 0,
    transform: "rotate(26deg)",
  },

  ".title3": {
    left: "95px",
    top: "-3px",
    transform: "rotate(24deg)",
  },

  ".menu": {
    "-webkit-tap-highlight-color": "transparent",
    background: " #2684FF",
    borderRadius: "50%",
    cursor: " pointer",
    height: " 100px",
    left: " -63px",
    position: "absolute",
    top: "-63px",
    width: " 100px",
    transform: "rotate(136deg)",
    textAlign: "center",

    span: {
      position: "relative",
      color: "#fff",
      top: "10%",
      fontSize: "14px",
    },
  },
  ".pies": {
    width: "200px",
    height: "200px",
    position: "absolute",
    borderRadius: "50%",
    background: "transparent",
    userSelect: "none",
  },

  ".pie": {
    "-webkit-tap-highlight-color": "transparent",
    borderRadius: "50%",
    cursor: "pointer",
    height: "180px",
    left: "-111px",
    position: "absolute",
    top: "-111px",
    width: "180px",
    transition: "transform 300ms",
    clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)",
  },
  // ".pie-color:hover": {
  //   opacity: "0.85",
  // },
  ".pie1": {
    transform: "rotate(-120deg)",
    transitionDelay: "30ms",
  },

  ".pie2": {
    transform: "rotate(-120deg)",
    transitionDelay: " 60ms",
  },

  ".pie3": {
    transform: "rotate(-120deg)",
    transitionDelay: "90ms",
  },

  ".pie-color": {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },

  ".pie-color1": {
    background: "#2e32e3",
  },

  ".pie-color2": {
    background: "#494cdf",
  },

  ".pie-color3": {
    background: "#6365d3",
  },
  ".active.pie2": {
    transform: "rotate(110deg)",
    transitionDelay: "60ms",
  },
  ".active.pie3": {
    transform: "rotate(160deg)",
    transitionDelay: "90ms",
  },
  ".active.pie1": {
    transform: "rotate(40deg)",
    transitionDelay: "30ms",
  },
});

type View = "Owner" | "Team" | "Client";
interface CircularNavigationProps {
  view: View;
  setView: (value: View) => void;
}

export const CircularNavigation: FC<CircularNavigationProps> = ({
  view,
  setView,
}) => {
  const { Text } = Typography;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSwitchView = (e: MouseEvent<HTMLDivElement>) => {
    setView(e.currentTarget.textContent as View);
    setMenuVisible(!menuVisible);
  };

  return (
    <WrapperStyled>
      <div className="navigationContainer">
        <div className="pies">
          <div
            className={clsx("pie pie1", menuVisible && "active")}
            onClick={(e) => handleSwitchView(e)}
          >
            <div className="pie-color pie-color1" />
            <p className="title title1">Team</p>
          </div>
          <div
            className={clsx("pie pie2", menuVisible && "active")}
            onClick={(e) => handleSwitchView(e)}
          >
            <div className="pie-color pie-color2" />
            <p className="title title2">Client</p>
          </div>
          <div
            className={clsx("pie pie3", menuVisible && "active")}
            onClick={(e) => handleSwitchView(e)}
          >
            <div className=" pie-color pie-color3" />
            <p className="title title3">Owner</p>
          </div>
        </div>
        <div className="menu" onClick={() => setMenuVisible(!menuVisible)}>
          <Text>{view}</Text>
        </div>
      </div>
    </WrapperStyled>
  );
};
