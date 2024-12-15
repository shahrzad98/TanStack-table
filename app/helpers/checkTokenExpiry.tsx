import getLocalStorageValue from "../helpers/getLocalStorageValue";
import { ICurrentUserStorage } from "~/types/user";
import React, { ComponentType, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import userStore from "~/stores/userStore";

const checkTokenExpiry = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const AuthenticatedComponent = (props: P) => {
    const [expiry] = useState<number | null>(
      getLocalStorageValue<ICurrentUserStorage>("divo-user-storage")?.state
        ?.currentUser?.expiry || null,
    );
    const logoutUser = userStore((state) => state.logout);
    const currentUser = userStore((state) => state.currentUser);

    const { signOut } = useAuth();
    const handleLogout = async () => {
      logoutUser();
      localStorage.removeItem("divo-user-storage");
      await signOut({ redirectUrl: "/sign-in" });
      return;
    };

    useEffect(() => {
      !currentUser && signOut({ redirectUrl: "/sign-in" });

      // Check user's token expiration
      // Logout if expired, mount if not
      if (expiry && new Date().getTime() > expiry) {
        handleLogout();
        return;
      }
    }, [expiry]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default checkTokenExpiry;
