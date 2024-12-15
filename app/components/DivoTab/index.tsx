import { Tabs, TabsProps } from "antd";
import styled, { StyledComponent } from "@emotion/styled";

const TabStyled: StyledComponent<TabsProps> = styled(Tabs)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  ".ant-tabs-tab": {
    padding: "10px 24px",
  },
  ".ant-tabs-nav": {
    marginBottom: 24,
  },
  "& .ant-tabs-nav-list": {
    borderBottom: `1px solid ${theme.disabledColor}`,
    margin: 0,
    userSelect: "none",
  },
  "&.ant-tabs": {
    padding: 0,
  },
  ".ant-tabs-tab-btn": {
    display: "flex",
    alignItems: "center",
  },
  ".ant-tabs-tab-icon": {
    marginRight: 12,
    svg: {
      position: "relative",
      top: 3,
    },
  },
}));

export const DivoTab = (props: TabsProps) => (
  <TabStyled className="customTab" {...props} />
);
