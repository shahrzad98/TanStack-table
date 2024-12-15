import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaArrowRight, FaRegBuilding } from "react-icons/fa";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { useCreateBreadcrumb } from "~/hooks/useCreateBreadcrumb";
import { ClientInfo, ProjectsTable } from "~/modules";
import { EpicsTable } from "~/modules/epics";
import { DivoLayout } from "~/components";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const Projects = () => {
  useCreateBreadcrumb();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const clientId = params.clientId;
  const [currentTab, setCurrentTab] = useState("1");

  const tabs = [
    {
      label: "Projects",
      key: "1",
      icon: <FiShoppingBag size={20} />,
      children: <ProjectsTable />,
    },
    {
      label: "Client Info",
      key: "2",
      icon: <FaRegBuilding size={20} />,
      children: <ClientInfo />,
    },

    {
      label: "Epics",
      key: "3",
      icon: <FaArrowRight />,
      children: <EpicsTable />,
    },
    {
      label: "Local Epics",
      key: "4",
      icon: <FaArrowRight />,
      children: <EpicsTable isLocal />,
    },
  ];
  return (
    <>
      <DivoLayout
        activeRoute="/clients"
        tabs={tabs}
        activeTab={searchParams.get("epics") ? "3" : currentTab}
        onTabClick={(value) => {
          setCurrentTab(value);
          if (value != "3") {
            void navigate(`/clients/${clientId}`, undefined);
          } else {
            void navigate(location.pathname);
            setSearchParams({ epics: "true" });
          }
        }}
      />
    </>
  );
};

export default checkTokenExpiry(Projects);
