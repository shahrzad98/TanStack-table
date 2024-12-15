import { api } from "~/api/apiClient";
import { IRoleResponse } from "~/types/role";

export const getRoles = (): Promise<IRoleResponse> =>
  api.get<IRoleResponse>("/roles");
