import { Dropdown, DropDownProps } from "antd";
import styled from "@emotion/styled";

export const DivoDropdown = ({ ...props }: DropDownProps) => {
  const StyledDropDown = styled(Dropdown)(() => ({
    minWidth: 143,

    ".ant-typography": {
      justifyContent: "space-between",
      svg: {
        marginLeft: 10,
      },
    },
  }));

  return (
    <StyledDropDown
      {...props}
      className={"test"}
      rootClassName="customDropdownMenu"
      overlayClassName="customDropdownOverlay"
    />
  );
};
