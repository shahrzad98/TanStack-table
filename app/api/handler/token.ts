import { api } from "~/api/apiClient";
import {
  ITokensResponse,
  ITokenRequest,
  ITokenResponse,
  ITokenData,
  IGeneralSettingsResponse,
  IGeneralSettingRequest,
  IGeneralSettingData,
} from "~/types/token";

export const getTokens = () => api.get<ITokensResponse>("/accounts");

export const createToken = (token: ITokenRequest) =>
  api.post<ITokenResponse>("/accounts", { account: token });

export const editToken = (id: string, token: ITokenRequest) =>
  api.put<ITokenResponse>(`/accounts/${id}`, { account: token });

export const deleteToken = (id: string) =>
  api.delete<ITokenData>(`/accounts/${id}`);

export const getGeneralSettings = () =>
  api.get<IGeneralSettingsResponse>("/general_settings");

export const createGeneralSetting = (body: IGeneralSettingRequest) =>
  api.post<{ data: IGeneralSettingData[] }>("/general_settings", body);

export const editGeneralSetting = (id: string, body: IGeneralSettingRequest) =>
  api.put<{ data: IGeneralSettingData[] }>(`/general_settings/${id}`, body);

export const deleteGeneralSetting = (id: string) =>
  api.delete(`/general_settings/${id}`);
