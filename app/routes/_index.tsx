import userStore from "../stores/userStore";
import { IUserStore } from "~/types/user";
import { DivoButton, DivoLayout } from "~/components";
import CheckTokenExpiry from "~/helpers/checkTokenExpiry";
import { useAuth } from "@clerk/clerk-react";

const Home = () => {
  const currentUser = userStore((state: IUserStore) => state.currentUser?.data);
  const { signOut } = useAuth();

  const logoutUser = userStore((state) => state.logout);

  const handleLogout = async () => {
    logoutUser();
    localStorage.removeItem("divo-user-storage");
    signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <DivoLayout activeRoute="/clients" onTabClick={() => {}} title="Dashboard">
      <div>
        {currentUser && (
          <h2>
            {currentUser?.first_name} {currentUser?.last_name}
          </h2>
        )}
        <DivoButton variant="primary" onClick={handleLogout}>
          Logout
        </DivoButton>
      </div>
    </DivoLayout>
  );
};

export default CheckTokenExpiry(Home);
