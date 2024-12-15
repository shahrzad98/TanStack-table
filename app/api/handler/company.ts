import { api } from "~/api/apiClient";
import { IRemoteClientResponse } from "~/types/client";
import { ICompaniesResponse, ICompanyResponse } from "~/types/company";

export const getCompanies = () => api.get<ICompaniesResponse>("/companies");

export const getCompany = (id: string) =>
  api.get<ICompanyResponse>(`/companies/${id}`);

export const getRemoteClients = (
  companyId: string,
  platform: string,
): Promise<IRemoteClientResponse> =>
  api.get<IRemoteClientResponse>(
    `/companies/${companyId}/remote_clients?type=${platform}`,
  );
