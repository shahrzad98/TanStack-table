import { api } from "~/api/apiClient";
import { IProjectRequest } from "~/types/project";
import {
  IProjectData,
  IProjectResponse,
  IProjectsResponse,
} from "~/types/client";

export const getProjects = (clientId: string) =>
  api.get<IProjectsResponse>(`/projects?client_id=${clientId}`);

export const createProjects = (body: IProjectRequest) =>
  api.post<IProjectResponse>(`/projects`, body);

export const updateProject = (projectId: string, body: IProjectRequest) =>
  api.put<IProjectData>(`/projects/${projectId}`, body);

export const deleteProject = (projectId: string) =>
  api.delete(`/projects/${projectId}`);
