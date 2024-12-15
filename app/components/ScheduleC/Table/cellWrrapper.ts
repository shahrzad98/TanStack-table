import styled, { StyledComponent } from "@emotion/styled";
import { Row, RowProps } from "antd";
import { theme } from "~/styles";

export const CellWrapperStyled: StyledComponent<RowProps> = styled(Row)({
  position: "relative",
  placeContent: "center",
  ".ant-col": {
    pointerEvents: "none",
  },
  ".editableCell": {
    textAlign: "center",
  },
  ":hover .epicIcon": {
    opacity: 1,
  },
  ".assigneeIcon": {
    cursor: "pointer",
    color: theme.successColor,
    position: "absolute",
    right: 5,
    bottom: -5,
    fontSize: 12,
  },
  ".epicIcon": {
    opacity: 0,
    fontSize: 15,
    strokeWidth: 1,
  },
  ".cellWrapper": {
    minHeight: 20,
  },
  ".searchEmployee": {
    minWidth: 220,
  },
  ".searchWrapper": {
    minWidth: 150,
    position: "absolute",
    top: 35,
    zIndex: 2,
    background: "#fff",
  },
  ".ant-input-affix-wrapper , .ant-input-affix-wrapper input": {
    background: "rgba(251, 251, 251, 1)",
  },

  ".assigneeImage": {
    position: "absolute",
    right: 5,
    bottom: -10,
    img: {
      width: 15,
      height: 15,
    },
  },
  ".noteIcon": {
    position: "absolute",
    top: -5,
    right: 5,
  },
});
