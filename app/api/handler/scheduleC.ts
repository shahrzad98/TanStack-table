import { api } from "~/api/apiClient";
import { ISOWsResponse } from "~/types/SOW";
import {
  IScheduleCBody,
  IScheduleCResponse,
  ISchedulesCPropertiesResponse,
  ISchedulesCPropertyBody,
  ISchedulesCResponse,
} from "~/types/scheduleC";

export const getScheduleCs = (projectId: string, SOWId: string) =>
  api.get<ISchedulesCResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs`,
  );

export const getScheduleC = (
  projectId: string,
  SOWId: string,
  scheduleCId: string,
) =>
  api.get<{ data: IScheduleCResponse }>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleCId}`,
  );
export const createScheduleC = (
  projectId: string,
  SOWId: string,
  body: IScheduleCBody,
) =>
  api.post<ISOWsResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs`,
    body,
  );
export const editScheduleC = (
  projectId: string,
  SOWId: string,
  scheduleCId: string,
  body: IScheduleCBody,
) =>
  api.put<ISOWsResponse>(
    `/projects/${projectId}/sows/${SOWId}/schedulecs/${scheduleCId}`,
    body,
  );

export const deleteScheduleC = (
  projectId: string,
  SOWId: string,
  ScheduleId: string,
) =>
  api.delete(`/projects/${projectId}/sows/${SOWId}/schedulecs/${ScheduleId}`);

export const getScheduleCProperties = (scheduleCId: string) =>
  api.get<ISchedulesCPropertiesResponse>(
    `/schedulec_properties?schedulec_id=${scheduleCId}`,
  );

export const createScheduleCProperty = (
  scheduleCId: string,
  body: ISchedulesCPropertyBody,
) =>
  api.post<ISchedulesCPropertyBody>(
    `/schedulec_properties?schedulec_id=${scheduleCId}`,
    body,
  );

export const editScheduleCProperty = (
  scheduleCId: string,
  scheduleCPropertyId: string,
  body: ISchedulesCPropertyBody,
) =>
  api.put<ISchedulesCPropertyBody>(
    `/schedulec_properties/${scheduleCPropertyId}?schedulec_id=${scheduleCId}`,
    body,
  );

export const deleteScheduleCProperty = (
  scheduleCId: string,
  scheduleCPropertyId: string,
) =>
  api.delete<ISchedulesCPropertyBody>(
    `/schedulec_properties/${scheduleCPropertyId}?schedulec_id=${scheduleCId}`,
  );
