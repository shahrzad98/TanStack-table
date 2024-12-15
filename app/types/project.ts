import { IMeta } from "./global";
import { IScheduleCStatus } from "./scheduleC";

export interface IScheduleCsResponse {
  data: IScheduleCData[];
  meta: IMeta;
}

export interface IScheduleCResponse {
  schdc: IScheduleCData;
}

export interface IScheduleCData {
  id: string;
  title: string;
  project_id: string;
  phase_number: any;
  status: IScheduleCStatus;
  phase_title: any;
  estimation_metric: "H" | "SP";
  created_at: string;
}

export interface IScheduleCRequest {
  title: string;
  template: string;
  estimation_metric: "H" | "SP"; // H for hour and SP for story point
}
export interface ITrackersResponse {
  data: ITracker[];
  meta: IMeta;
}
export interface ITracker {
  id: string;
  name: string;
  kind: string;
  client_id: string;
  remote_id: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  name: string;
  status: IProjectStatus | null;
  code: string;
}
type IProjectStatus = "discovery" | "lost" | "sales" | "won" | "estimation";
export interface IProjectRequest {
  clientId: string;
  project: IProject;
}
