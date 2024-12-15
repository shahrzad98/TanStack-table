import { api } from "~/api/apiClient";
import {
  IClientRequest,
  IClientResponse,
  IClientsResponse,
  IProjectResponse,
  IRemoteProjectsResponse,
} from "~/types/client";
import { IProjectRequest, ITrackersResponse } from "~/types/project";
import getLocalStorageValue from "../../helpers/getLocalStorageValue";
import { ICurrentUserStorage } from "~/types/user";

export interface IStatusFilter {
  isActive: boolean | string;
}

const storageCompanyID =
  getLocalStorageValue<ICurrentUserStorage>("divo-user-storage")?.state
    ?.currentUser?.data?.employees[0]?.company?.id;

export const getClients = (filter: IStatusFilter) =>
  api.get<IClientsResponse>(
    filter.isActive == "all"
      ? "/clients"
      : `/clients?is_active=${filter.isActive}`,
  );

export const getClient = (id: string) =>
  api.get<IClientResponse>(`/clients/${id}`);

export const createClient = (client: IClientRequest) =>
  api.post<IClientResponse>("/clients", {
    company_id: storageCompanyID,
    client: client,
  });

export const editClient = (id: string, body: IClientRequest) =>
  api.put<IClientResponse>(`/clients/${id}`, { client: body });

export const deleteClient = (id: string) => api.delete(`/clients/${id}`);

export const getProject = (clientId: string, projectId: string) =>
  api.get<IProjectResponse>(`/projects/${projectId}?client_id=${clientId}`);

export const getRemoteProjects = (type: "jira" | "toggl") =>
  api.get<IRemoteProjectsResponse>(
    `/companies/${storageCompanyID}/remote_clients?type=${type}`,
  );

export const getTrackers = (clientId: string) =>
  api.get<ITrackersResponse>(`/clients/${clientId}/trackers`);

export const editProject = (
  id: string,
  clientId: number,
  body: IProjectRequest,
) =>
  api.put<IProjectResponse>(`/projects/${id}`, {
    client_id: clientId,
    project: body,
  });
