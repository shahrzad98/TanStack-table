import { Button, ButtonProps } from "antd";
import styled, { StyledComponent } from "@emotion/styled";

interface DivoButtonProps extends ButtonProps {
  variant: "primary" | "secondary";
  iconButton?: boolean;
}

const ButtonStyled: StyledComponent<DivoButtonProps> = styled(Button)(({
  theme,
  variant,
  iconButton = false,
}) => {
  const secondary = variant === "secondary";
  return {
    minWidth: 40,
    height: 40,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    padding: iconButton ? 10 : "10px 16px",
    backgroundColor: secondary ? theme.white : theme.primaryColor,
    borderColor: theme.primaryColor,
    color: secondary ? theme.primaryColor : theme.white,
    "&.disabled": {
      border: secondary ? `1px solid  ${theme.disabledColor}` : "none",
      backgroundColor: secondary ? theme.white : theme.disabledColor,
      color: secondary ? theme.disabledColor : theme.white,
    },
  };
});

export const DivoButton = (props: DivoButtonProps) => {
  return (
    <ButtonStyled
      className={props.disabled ? "disabled" : undefined}
      {...props}
    >
      {props.children}
    </ButtonStyled>
  );
};
