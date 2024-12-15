import { Select } from "antd";
import styled from "@emotion/styled";
import { FiChevronDown } from "react-icons/fi";
import { ComponentProps } from "react";

const StyledSelect = styled(Select)(({ theme }) => ({
  background: theme.white,
  padding: "10px 8px 10px  5px",
  minWidth: 112,
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: 10,
  height: 40,
  ".ant-select-arrow": {
    color: theme.secondaryColor,
  },
}));

export const DivoSelect = (props: ComponentProps<typeof StyledSelect>) => {
  return (
    <StyledSelect
      suffixIcon={<FiChevronDown size={15} />}
      variant="borderless"
      {...props}
    />
  );
};
