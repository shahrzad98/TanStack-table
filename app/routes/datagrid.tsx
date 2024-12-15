import { useCreateBreadcrumb } from "~/hooks/useCreateBreadcrumb";
import { useSearchParams } from "@remix-run/react";
import { DataGridModule, DataGridSidebar, Settings } from "~/modules";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const DataGrid = () => {
  useCreateBreadcrumb();
  const [searchParams] = useSearchParams();
  return (
    <DataGridSidebar>
      {searchParams.get("edit") && <DataGridModule />}
      {searchParams.get("setting") && <Settings />}
    </DataGridSidebar>
  );
};

export default checkTokenExpiry(DataGrid);
