import { DivoLayout } from "~/components";
import { EmployeeTable } from "~/modules";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const Employees = () => {
  return (
    <DivoLayout activeRoute="/employees" title="Users">
      <EmployeeTable />
    </DivoLayout>
  );
};

export default checkTokenExpiry(Employees);
