import React, { ReactNode, useState } from "react";
import { DivoTab, Sidebar } from "~/components";
import styled, { StyledComponent } from "@emotion/styled";
import { Row, Typography } from "antd";
import { capitalize } from "~/utils/capitalize";
import { Header } from "./Header";
import { detectRoute } from "~/utils/detectRoute";
import { useLocation, useParams } from "@remix-run/react";

interface TabItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children: ReactNode;
}

interface DivoLayoutProps {
  activeRoute: string;
  tabs?: TabItem[];
  hasHeader?: boolean;
  activeTab?: string;
  onTabClick?: (activeKey: string) => void;
  wrapperClassName?: string;
  children?: ReactNode;
  title?: string;
  headerChildren?: ReactNode;
}

interface LayoutStyledProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarIsOpen: boolean;
  hasTabs: boolean;
}

const LayoutStyled: StyledComponent<LayoutStyledProps> = styled("div")(
  ({ theme, sidebarIsOpen, hasTabs }) => ({
    width: `calc(100% - ${sidebarIsOpen ? "229px" : "46px"})`,
    backgroundColor: theme.pristine,
    marginLeft: sidebarIsOpen ? "229px" : "46px",
    ".childrenWrapper": {
      padding: "0 30px 0 44px",
    },
    ".pageTitle": {
      marginBottom: 24,
    },
    "& .ant-tabs": {
      padding: "0 20px",
    },
    "& .ant-tabs+div": {
      width: "100%",
      minHeight: "calc(100vh - 70px)",
      background: "#F3F8FC",
      padding: "20px 20px 0",
    },
    "& > div": !hasTabs && {
      width: "100%",
      minHeight: "100vh",
    },
  }),
);

export const DivoLayout = ({
  activeRoute = "",
  tabs,
  activeTab,
  onTabClick = () => {},
  wrapperClassName = "",
  children = <></>,
  title,
  hasHeader = true,
}: DivoLayoutProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const { Title } = Typography;
  const location = useLocation();
  const params = useParams();
  const pathNames = location.pathname.split("/").filter((x) => x);

  const sideBarRoutes = {
    clients: "/clients",
    employees: "/employees",
    reports: "/reports",
    tokens: "/tokens",
  };
  return (
    <>
      <Sidebar
        open={sidebarIsOpen}
        setOpen={setSidebarIsOpen}
        routes={sideBarRoutes}
        activeRoute={activeRoute}
        style={{ top: 0 }}
      />
      <LayoutStyled sidebarIsOpen={sidebarIsOpen} hasTabs={!!tabs}>
        {hasHeader && <Header />}

        <div className={wrapperClassName || "childrenWrapper"}>
          <Row justify="space-between" align="middle" className="filterWrapper">
            {pathNames[0] && (
              <Title level={3} className="pageTitle">
                {title ??
                  capitalize(
                    detectRoute([...pathNames, ...Object.keys(params)])["true"],
                  )}
              </Title>
            )}
          </Row>
          <Row>
            {tabs && (
              <DivoTab
                items={tabs}
                activeKey={activeTab}
                onChange={onTabClick}
              />
            )}
          </Row>
          {children}
        </div>
      </LayoutStyled>
    </>
  );
};
