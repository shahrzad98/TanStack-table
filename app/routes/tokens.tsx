import { FiLink, FiSettings } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "@remix-run/react";
import { GeneralSettingTable, TokenTable } from "~/modules";
import { DivoLayout } from "~/components";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const Tokens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabs = [
    {
      label: "API Tokens",
      key: "1",
      icon: <FiLink size={20} />,
      children: <TokenTable />,
    },

    {
      label: `General Settings`,
      key: "2",
      icon: <FiSettings size={20} />,
      children: <GeneralSettingTable />,
    },
  ];
  return (
    <DivoLayout
      activeRoute="/tokens"
      title="Settings"
      tabs={tabs}
      activeTab={searchParams.get("generalSetting") ? "2" : "1"}
      onTabClick={() => {
        if (searchParams.get("generalSetting")) {
          void navigate(location.pathname);
        } else {
          navigate(location.pathname);
          setSearchParams({ generalSetting: "true" });
        }
      }}
    />
  );
};

export default checkTokenExpiry(Tokens);
