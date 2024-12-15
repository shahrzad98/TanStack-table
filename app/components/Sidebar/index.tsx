import React, { useCallback, useEffect } from "react";

import { Link } from "@remix-run/react";
import {
  FiArrowRightCircle as ArrowIcon,
  FiFileText as ReportsIcon,
  FiSettings as SettingsIcon,
  FiUser as UserIcon,
  FiUsers as EmployeesIcon,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding as ClientsIcon } from "react-icons/hi";

import styled, { StyledComponent } from "@emotion/styled";

import DivNoteLogo from "../../modules/icons/DivnotesLogo";

interface DivoSidebarStyledProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DivoSidebarProps extends DivoSidebarStyledProps {
  activeRoute: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultOpen?: boolean;
  profileData?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  routes: {
    clients: string;
    employees: string;
    reports: string;
    tokens: string;
  };
}

const SmallLogo: StyledComponent<typeof DivNoteLogo> = styled(DivNoteLogo)(
  () => ({
    width: "28px",
    marginBottom: "19px",
    "& path:first-of-type": {
      display: "none",
    },
  }),
);

const LargeLogo: StyledComponent<typeof DivNoteLogo> = styled(DivNoteLogo)(
  () => ({
    width: "102px",
    marginBottom: "19px",
  }),
);

const SidebarStyled: StyledComponent<DivoSidebarStyledProps> = styled("div")(({
  theme,
}) => {
  const style = {
    primaryColor: theme.primaryColor,
    open: {
      width: 229,
    },
    close: {
      width: 46,
    },
  };

  return {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    minHeight: "500px",
    width: style.close.width,
    backgroundColor: theme.grayBackground,
    "& *": {
      transition: "all 300ms cubic-bezier(0.2, 0, 0, 1) !important",
    },
    "& .nav-section svg": {
      transition: "all 50ms cubic-bezier(0.2, 0, 0, 1) 0s",
    },

    ".trigger": {
      position: "absolute",
      top: 70,
      right: "-10px",
      outline: "0px",
      padding: "0px",
      cursor: "pointer",
      opacity: ".7",
      svg: {
        color: theme.primaryColor,
        transform: `rotate(0)`,
      },
      ".tooltip": {
        fontFamily: theme.fontFamily,
        position: "absolute",
        maxWidth: 240,
        padding: "2px 6px",
        borderRadius: "3px",
        fontSize: "12px",
        lineHeight: "1.3",
        opacity: 0,
        backgroundColor: "#172B4D",
        color: "#FFFFFF",
        left: 36,
        top: 2,
        transform: "translateX(-5px)",
        span: {
          backgroundColor: "#505F79",
          borderRadius: "2px",
          lineHeight: "1.2",
          marginLeft: "4px",
          padding: "1px 8px",
        },
      },
      "&:hover": {
        ".tooltip": {
          opacity: 1,
          transform: "translateX(0)",
        },
      },
    },

    "&.open": {
      width: style.open.width,
      "& .trigger": {
        top: 50,
        svg: {
          color: theme.linkColor,
          transform: `rotate(180deg)`,
        },
      },
    },

    "&:hover": {
      ".trigger": {
        opacity: "1",
      },
    },
    ".sidebar-wrapper": {
      overflow: "hidden",

      ".sidebar-inner": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        flexShrink: 0,
        width: style.open.width,
        paddingTop: 30,

        "&-close-logo": {
          display: "none",
        },

        ".profile-section": {
          position: "absolute",
          boxSizing: "border-box",
          left: 0,
          bottom: 0,
          height: 68,
          borderTop: "1px solid rgba(102 ,112 ,128 ,0.4)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "17px 0 24px 0",
          alignItems: "center",
          "& .profile-content a": {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
            gap: 15,
            color: theme.linkColor,
            textDecoration: "none",
            span: {
              fontFamily: theme.fontFamily,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "22px",
              letterSpacing: "-0.02em",
              padding: "17px 0",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
            },
            "&:hover": {
              span: {
                color: theme.primaryColor,
              },
              svg: {
                color: theme.primaryColor,
              },
            },
          },
        },

        ".nav-section": {
          width: "100%",
          margin: 0,
          padding: 0,

          ".nav-links": {
            display: "block",
            listStyle: "none",
            padding: "0 15px 0 20px",
            li: {
              boxSizing: "border-box",
              margin: 0,
              fontFamily: theme.fontFamily,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "22px",
              padding: "17px 0 17px 25px",
              cursor: "pointer",
              a: {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                letterSpacing: "-0.02em",
                color: theme.linkColor,
                textDecoration: "none",
              },
              "&:hover": {
                span: {
                  color: theme.primaryColor,
                },
                svg: {
                  color: theme.primaryColor,
                },
              },
              "&.active": {
                color: theme.primaryColor,
                listStyle: "none",
                padding: "0",
                "& > .active.wrapper": {
                  boxSizing: "border-box",
                  padding: "16px 0 16px 25px",
                  width: "100%",
                  maxHeight: "52px",
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  background: "#fff",
                },
                "span, svg": {
                  color: theme.primaryColor,
                },
              },
              span: {
                marginLeft: 19,
              },
            },
          },
        },
      },
    },

    "&:not(.open)": {
      backgroundColor: theme.darkGrayBackground,

      ".trigger": {
        opacity: "1",
      },

      ".sidebar-inner": {
        width: style.close.width,
        "&-open-logo": {
          paddingTop: 20,
          display: "none",
        },
        "&-close-logo": {
          display: "block",
        },
        ".profile-section": {
          paddingLeft: 0,
          justifyContent: "center",
          border: "none",
          span: {
            display: "none!important",
          },
        },

        ".nav-section": {
          ".nav-links": {
            width: "100%",
            padding: 0,
            li: {
              display: "flex",
              paddingLeft: 8,
              paddingRight: 8,
              justifyContent: "center",

              "&.active": {
                color: theme.primaryColor,
                fill: theme.primaryColor,
                listStyle: "none",
                padding: "0",
                "& > .active.wrapper": {
                  justifyContent: "center",
                  width: style.close.width - 4 * 2,
                  borderRadius: "8px",
                  margin: "0 4px",
                  paddingLeft: "0",
                  svg: {
                    padding: 0,
                    margin: 0,
                  },
                },
              },

              span: {
                opacity: "0",
                width: 0,
                height: 0,
                padding: 0,
                margin: 0,
                overflow: "hidden",
                visibility: "hidden",
              },
            },
          },
        },
      },
    },
  };
});

export const Sidebar = ({
  className,
  activeRoute,
  open,
  setOpen,
  defaultOpen = true,
  profileData,
  routes,
  ...props
}: DivoSidebarProps) => {
  const toggleSidebar = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "[") {
        toggleSidebar();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  const menuRoutes = [
    {
      icon: <ClientsIcon size={20} />,
      title: "Clients",
      route: routes.clients,
    },
    {
      icon: <EmployeesIcon size={20} />,
      title: "Employees",
      route: routes.employees,
    },
    {
      icon: <ReportsIcon size={20} />,
      title: "Reports",
      route: routes.reports,
    },
    {
      icon: <SettingsIcon size={20} />,
      title: "Settings",
      route: routes.tokens,
    },
  ];

  return (
    <SidebarStyled {...props} className={`${open ? "open" : ""}`}>
      <div className="trigger" onClick={() => toggleSidebar()}>
        <ArrowIcon size={20} />
        <div className="tooltip">
          {open ? "Collapse" : "Expand"}
          <span>{"["}</span>
        </div>
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-inner">
          <LargeLogo className="sidebar-inner-open-logo" />
          <SmallLogo className="sidebar-inner-close-logo" viewBox="0 0 30 20" />

          <div className="nav-section">
            <ul className="nav-links">
              {menuRoutes.map((item, i) => (
                <li
                  key={i}
                  className={item.route === activeRoute ? "active" : ""}
                >
                  {item.route === activeRoute ? (
                    <div className="active wrapper">
                      <Link to={item.route}>
                        <>
                          {item.icon}
                          <span>{item.title}</span>
                        </>
                      </Link>
                    </div>
                  ) : (
                    <Link to={item.route}>
                      <>
                        {item.icon}
                        <span>{item.title}</span>
                      </>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="profile-section">
            <div className="profile-content">
              <Link to="/profile">
                <>
                  <UserIcon size="24" />
                  <span>User Profile</span>
                </>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarStyled>
  );
};
