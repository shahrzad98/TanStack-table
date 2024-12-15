import { api } from "~/api/apiClient";
import {
  ISOWRequest,
  ISOWResponse,
  ISOWsResponse,
  ISOWUpdate,
} from "~/types/SOW";

export const getSOWs = (projectId: string) =>
  api.get<ISOWsResponse>(`/projects/${projectId}/sows`);

export const getSOW = (projectId: string, SOWId: string) =>
  api.get<{ data: ISOWResponse }>(`/projects/${projectId}/sows/${SOWId}`);

export const createSOW = (projectId: string, SOW: ISOWRequest) =>
  api.post<ISOWsResponse>(`/projects/${projectId}/sows`, SOW);

export const editSOW = (projectId: string, SOWId: string, body: ISOWUpdate) =>
  api.put<ISOWsResponse>(`/projects/${projectId}/sows/${SOWId}`, body);

export const deleteSOW = (projectId: string, SOWId: string) =>
  api.delete(`/projects/${projectId}/sows/${SOWId}`);
