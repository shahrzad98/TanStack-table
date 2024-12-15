import { IMeta } from "./global";

export interface ITokensResponse {
  accounts: ITokenData[];
  meta: {
    count: number;
  };
}

export interface ITokenResponse {
  account: ITokenData;
}

export interface ITokenData {
  id: string;
  name: string;
  company_id: string;
  kind: string;
  email: string;
  token: string;
  domain: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITokenRequest {
  name: string;
  kind: string;
  email: string;
  token: string;
  domain: string;
}

export interface IGeneralSettingData {
  id: string;
  company_id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface IGeneralSettingsResponse {
  data: IGeneralSettingData[];
  meta: IMeta;
}

export interface IGeneralSetting {
  key: string;
  value: string;
}
export interface IGeneralSettingRequest {
  general_setting: IGeneralSetting;
}
