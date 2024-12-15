import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserStore } from "~/types/user";

const userStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      setUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      isAuth: () => get().currentUser !== null,
    }),
    {
      name: "divo-user-storage",
    },
  ),
);

export default userStore;
