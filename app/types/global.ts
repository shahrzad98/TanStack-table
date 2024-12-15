import { AxiosError } from "axios";
import { BreadcrumbProps } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

export type InputType =
  | "default"
  | "select"
  | "upload"
  | "fromInput"
  | "colorPicker"
  | "datePicker"
  | "textArea"
  | "withIcon";

export interface CustomErrorResponse {
  message: string;
  errors: string[];
}

export type LayoutStoreState = {
  breadcrumbs: BreadcrumbProps["items"] | undefined;
  setBreadcrumbs: (payload: BreadcrumbProps["items"] | undefined) => void;
  addBreadcrumb: (payload: BreadcrumbItemType) => void;
};

//ToDo : Move this method
export function isHttpError(
  response: unknown,
): response is AxiosError<CustomErrorResponse> {
  return (response as AxiosError)?.isAxiosError;
}

export interface IError {
  message: string;
}

export interface IMeta {
  count: number;
}
