import { IMeta } from "./global";

export interface IScheduleCResponse {
  id: string;
  name: string;
  status: IScheduleCStatus;
  created_at: string;
  updated_at: string;
}

export type IScheduleCStatus =
  | "draft"
  | "client_review"
  | "approved"
  | "rejected"
  | "completed";
export interface ISchedulesCResponse {
  data: IScheduleCResponse[];
  meta: IMeta;
}
export interface IScheduleCBody {
  name?: string;
  status?: IScheduleCStatus | null;
}

export interface ISchedulesCProperty {
  id?: string;
  order?: string;
  team_view?: boolean;
  client_view?: boolean;
  name?: string;
  slug?: string;
  value?: string;
  value_type?: "percentage" | "number" | null;
}

export interface ISchedulesCPropertiesResponse {
  data: ISchedulesCProperty[];
  meta: IMeta;
}

export interface ISchedulesCPropertyBody {
  schedulec_property: ISchedulesCProperty;
}
