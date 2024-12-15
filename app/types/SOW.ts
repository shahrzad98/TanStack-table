import { IMeta } from "./global";
import { IScheduleCStatus } from "./scheduleC";

interface ITracker {
  id: string;
  name: string;
  kind: string;
  client_id: string;
  remote_id: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface ISOWResponse {
  id: string;
  project_id: string;
  phase_number: string;
  phase_title: string;
  status: IScheduleCStatus;
  kind: string;
  start_date: string | null;
  end_date: string | null;
  hour_limit: string | null;
  price_limit: string | null;
  created_at: string;
  updated_at: string;
  trackers: ITracker[] | null;
}

export interface ISOWsResponse {
  data: ISOWResponse[];
  meta: IMeta;
}

export interface ISOWUpdate {
  hour_limit: string;
  price_limit: string;
  trackers: ITracker[] | null;
}

export interface ISOWRequest {
  phase_title: string;
  phase_number: string;
  doc?: string;
  status: IScheduleCStatus | null;
  kind: "t_and_m" | "phase" | null;
  start_date: string;
  end_date: string;
  hour_limit: string;
  price_limit: string;
  trackers: ITracker[] | null;
}
