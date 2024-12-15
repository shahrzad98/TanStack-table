import { IMeta } from "./global";

export interface IClientsResponse {
  data: IClientData[];
  meta: IMeta;
}

export interface IClientResponse {
  data: IClientData;
}
export interface IClientRequest {
  name: string;
  code: string;
  color: string;
  logo: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  issue_tracker_client_id: string;
  issue_tracker_account_id: string;
  issue_tracker_client_name: string;
  issue_tracker_name: string;
  time_tracker_client_id: string;
  time_tracker_account_id: string;
  time_tracker_client_name: string;
  time_tracker_workspace_id: string;
  time_tracker_name: string;
  is_active: string;
}

export interface IClientData {
  id: string;
  company_id: string;
  name: string;
  logo_url: string | null;
  code: string;
  color: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  is_active: string;
  time_tracker_workspace_id: string | null;
  time_tracker_client_id: string;
  time_tracker_client_name: string | null;
  time_tracker_account_id: string;
  time_tracker_name: string | null;
  issue_tracker_client_id: string;
  issue_tracker_client_name: string | null;
  issue_tracker_account_id: string;
  issue_tracker_name: string | null;
  created_at: string;
}

export interface IClientTableData {
  key?: number;
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  time_tracker?: string;
  issue_tracker?: string;
  epic?: string;
  epicIcon?: string;
  epicUrl?: string;
  displayAs?: string;
  description?: string;
}

export interface IProjectsResponse {
  data: IProjectData[];
  meta: IMeta;
}

export interface IProjectResponse {
  data: IProjectData;
}

export interface IProjectData {
  client_id: string;
  code: string;
  created_at: string;
  id: string;
  name: string;
  status: string;
  updated_at: string;
}

export interface IRemoteTogglProject {
  id: string;
  workspace_id: string;
  archived: boolean;
  name: string;
  account_id: string;
}

export interface IRemoteProjectsResponse {
  data: IRemoteTogglProject[] | IRemoteJiraProject[];
  meta: IMeta;
}

export interface IRemoteJiraProject {
  id: string;
  name: string;
  key: string;
  avatar_urls: {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
  };
  account_id: string;
}

export interface IRemoteClientResponse {
  data: IRemoteClientData[];
  meta: {
    count: number;
  };
}

export interface IRemoteClientData {
  id?: number;
  name?: string;
  key?: string;
  avatar_urls?: {
    [size: string]: [url: string];
  };
  workspace_id?: number;
  archived?: boolean;
  account_id?: number;
}
