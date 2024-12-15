import { DivoLayout } from "~/components";
import { ClientsTable } from "~/modules";
import checkTokenExpiry from "~/helpers/checkTokenExpiry";

const Clients = () => {
  return (
    <DivoLayout activeRoute="/clients">
      <ClientsTable />
    </DivoLayout>
  );
};

export default checkTokenExpiry(Clients);
