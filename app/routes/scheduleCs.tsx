import { useCreateBreadcrumb } from "~/hooks/useCreateBreadcrumb";
import React from "react";
import { ScheduleCTable } from "~/modules";
import { DivoLayout } from "~/components";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const ScheduleCs = () => {
  useCreateBreadcrumb();

  return (
    <>
      <DivoLayout activeRoute="/clients">
        <ScheduleCTable />
      </DivoLayout>
    </>
  );
};

export default checkTokenExpiry(ScheduleCs);
