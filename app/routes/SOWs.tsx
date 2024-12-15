import { useCreateBreadcrumb } from "~/hooks/useCreateBreadcrumb";
import { DivoLayout } from "~/components";
import { SOWsTable } from "~/modules";
import { FiBriefcase } from "react-icons/fi";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

export const SOWs = () => {
  useCreateBreadcrumb();
  return (
    <DivoLayout
      activeRoute="/clients"
      tabs={[
        {
          label: "SOWs",
          key: "1",
          children: <SOWsTable />,
          icon: <FiBriefcase />,
        },
      ]}
    />
  );
};

export default checkTokenExpiry(SOWs);
