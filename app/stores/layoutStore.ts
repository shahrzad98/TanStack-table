import { create } from "zustand";
import { LayoutStoreState } from "~/types/global";

const useLayoutStore = create<LayoutStoreState>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (payload) => set({ breadcrumbs: payload }),
  addBreadcrumb: (payload) => {
    return set((state) => ({
      breadcrumbs: !state.breadcrumbs?.find((I) => I.title == payload.title)
        ? [...(state.breadcrumbs ?? []), payload]
        : [payload],
    }));
  },
}));

export default useLayoutStore;
