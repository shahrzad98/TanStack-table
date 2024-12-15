import React from "react";

import styled, { StyledComponent } from "@emotion/styled";

import DivnotesLogo from "../../modules/icons/DivnotesLogo";

interface DivoStyledHeaderCustomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

interface DivoHeaderCustomProps {
  defaultLogo: boolean;
  link?: string;
  width?: number;
  height?: number;
  logoAlt?: string;
  children?: React.ReactNode;
}

const HeaderLogoStyled: StyledComponent<DivoStyledHeaderCustomProps> = styled(
  "div",
)(({ ...props }) => ({
  "& a": {
    display: "flex",
    alignItems: "center",

    "& svg,& img": {
      width: props?.width || "unset",
      height: props?.height || "unset",
    },
  },
}));

export const HeaderLogo = ({
  defaultLogo = true,
  link,
  children,
  logoAlt,
  ...props
}: DivoHeaderCustomProps) => (
  <HeaderLogoStyled className={styles.logoContainer} {...props}>
    <a href={link}>{defaultLogo ? <DivnotesLogo /> : children}</a>
  </HeaderLogoStyled>
);
