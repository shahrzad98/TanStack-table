import { IMeta } from "./global";

export interface IEpicResponse {
  id: string;
  title: string;
  key: string;
  is_local: boolean;
  color: string | null;
  description: string;
  created_at: string;
}

export interface IEpicsResponse {
  data: IEpicResponse[];
  meta: IMeta;
}

export interface IEpic {
  id?: string;
  title: string;
  key: string;
  color: string;
  description: string;
  display_name?: string | null;
  is_local?: boolean;
  created_at?: string;
}
export interface IEpicData {
  epic: Partial<IEpic>;
}
