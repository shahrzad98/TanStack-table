import { Breadcrumb, BreadcrumbProps, Row } from "antd";
import styled from "@emotion/styled";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { DivoButton } from "~/components";

import Home from "../../modules/icons/Home";
import { capitalize } from "~/utils/capitalize";
import {
  AddClient,
  AddEmployee,
  AddGeneralSetting,
  AddProject,
  AddSOW,
  AddToken,
} from "~/modules";
import { ReactElement, useMemo, useState } from "react";
import { detectRoute } from "~/utils/detectRoute";
import useLayoutStore from "../../stores/layoutStore";
import { AddScheduleC } from "~/modules/scheduleC/form";

const WrapperStyled = styled(Row)(({ theme }) => ({
  height: 60,
  padding: "0 50px",
  backgroundColor: theme.white,
  button: {
    svg: {
      alignSelf: "center",
      marginRight: 8,
    },
  },
  ".ant-breadcrumb": {
    alignSelf: "center",
    ".ant-breadcrumb-separator": {
      position: "relative",
      top: 3,
      color: theme.lightGray,
    },
    li: {
      alignSelf: "center",
    },
    ".home": {
      position: "relative",
      top: 2,
    },
  },
  "&& .ant-breadcrumb-link": {
    color: theme.lightGray,
    "& :hover": {
      backgroundColor: "transparent",
    },
  },
}));

export const Header = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const pathNames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = useLayoutStore((state) => state.breadcrumbs);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const items = useMemo(() => {
    const array: BreadcrumbProps["items"] = [
      {
        title: (
          <Link to="/" className="home">
            <Home />
          </Link>
        ),
      },
    ];

    if (pathNames[0]) {
      array.push({
        title: (
          <Link to={`/${pathNames[0]}`}>{capitalize(pathNames[0] ?? "")}</Link>
        ),
      });
    }
    if (Array.isArray(breadcrumbs)) {
      array.push(...breadcrumbs);
    }

    return array;
  }, [breadcrumbs, pathNames]);

  const addComponents: { [key: string]: ReactElement } = {
    employees: (
      <AddEmployee open={addModalVisible} setOpen={setAddModalVisible} />
    ),
    clients: <AddClient open={addModalVisible} setOpen={setAddModalVisible} />,
    tokens: <AddToken open={addModalVisible} setOpen={setAddModalVisible} />,
    "general settings": (
      <AddGeneralSetting open={addModalVisible} setOpen={setAddModalVisible} />
    ),
    projects: (
      <AddProject open={addModalVisible} setOpen={setAddModalVisible} />
    ),
    SOWs: <AddSOW open={addModalVisible} setOpen={setAddModalVisible} />,
    ScheduleCs: (
      <AddScheduleC open={addModalVisible} setOpen={setAddModalVisible} />
    ),
  };
  return (
    <WrapperStyled justify="space-between" style={{ minHeight: 60 }}>
      {
        addComponents[
          detectRoute([...pathNames, ...Object.keys(params)], searchParams)[
            "true"
          ]
        ]
      }
      <Breadcrumb separator={<FiChevronRight size={24} />} items={items} />
      {pathNames[0] && !searchParams.get("setting") && (
        <DivoButton variant="primary" onClick={() => setAddModalVisible(true)}>
          <FiPlus size={20} /> Add{" "}
          {capitalize(
            detectRoute([...pathNames, ...Object.keys(params)], searchParams)[
              "true"
            ].slice(0, -1),
          )}
        </DivoButton>
      )}
    </WrapperStyled>
  );
};
