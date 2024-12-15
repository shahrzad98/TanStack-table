import { api } from "~/api/apiClient";
import { IEpicData, IEpicsResponse } from "~/types/epic";

export const getEpics = (clientId: string) =>
  api.get<IEpicsResponse>(`/epics?client_id=${clientId}`);

export const createEpic = (clientId: string, body: IEpicData) =>
  api.post<IEpicData>(`/epics?client_id=${clientId}`, body);

export const editEpic = (clientId: string, epicId: string, body: IEpicData) =>
  api.put<IEpicData>(`/epics/${epicId}?client_id=${clientId}`, body);

export const deleteEpic = (clientId: string, epicId: string) =>
  api.delete(`/epics/${epicId}?client_id=${clientId}`);
