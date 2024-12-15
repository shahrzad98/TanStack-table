import { Layout, LayoutProps, Menu, Row } from "antd";
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";
import styled, { StyledComponent } from "@emotion/styled";
import {
  IconBuilding,
  IconFileText,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import DivNoteLogo from "../../modules/icons/DivnotesIcon";
import { CircularNavigation } from "~/components";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";

const LayoutStyled: StyledComponent<LayoutProps> = styled(Layout)({
  position: "relative",
  height: "100vh",
  overflow: "hidden",

  ".ant-layout-sider , .ant-menu": {
    backgroundColor: "#DEE2E9",
  },
  ".ant-menu-item-selected": {
    background: "#fff  ",
  },

  ".ant-layout-sider-children ul": {
    "& li": {
      padding: "0!important",
      width: 38,
      height: 52,
    },
    "& svg": {
      color: "rgba(93, 102, 113, 1)!important",
      marginLeft: 7,
    },
  },
  ".logo": {
    margin: "28px 0 ",
  },
  ".profile": {
    position: "absolute",
    bottom: 0,
    "& svg": {
      marginLeft: 7,
    },
  },
  ".ant-menu-item:last-child": {
    position: "absolute",
    bottom: 0,
  },
  ".content": {
    maxWidth: "98%",
    width: "100%",
    background: "#F3F8FC",
  },
});

export const DataGridSidebar: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { Sider } = Layout;

  const [view, setView] = useState<"Owner" | "Team" | "Client">("Team");

  const routes = {
    clients: "/clients",
    employees: "/employees",
    reports: "/reports",
    tokens: "/tokens",
  };

  const menuItems = [
    {
      key: "1",
      icon: <IconBuilding width={24} height={24} />,
      route: routes.clients,
    },
    {
      key: "2",
      icon: <IconUsers width={24} height={24} />,
      route: routes.employees,
    },
    {
      key: "3",
      icon: <IconFileText width={24} height={24} />,
      route: routes.reports,
    },
    {
      key: "4",
      icon: <IconSettings width={24} height={24} />,
      route: routes.tokens,
    },
    {
      key: 5,
      icon: <IconUser width={24} height={24} />,
    },
  ];

  type View = "Owner" | "Team" | "Client";

  interface ChildProps {
    view: View;
  }

  return (
    <LayoutStyled hasSider>
      <Sider width={46}>
        <Row justify="center" className="logo">
          <Link to="/">
            <DivNoteLogo />
          </Link>
        </Row>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={menuItems}
          onClick={(e) =>
            navigate(menuItems.find((el) => el.key == e.key)?.route as string)
          }
        />
      </Sider>
      <div className="content">
        {Children.map(children as ReactElement<ChildProps>[], (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              view,
            });
          }
        })}
      </div>
      {!searchParams.get("setting") && (
        <CircularNavigation view={view} setView={setView} />
      )}
    </LayoutStyled>
  );
};
