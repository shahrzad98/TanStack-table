import { api } from "~/api/apiClient";
import {
  IEmployeeRequest,
  IEmployeeResponse,
  IEmployeesResponse,
  UpdateEmployeeProjects,
} from "~/types/employee";
import { ICurrentUser } from "~/types/user";

export const getEmployees = () => api.get<IEmployeesResponse>("/employees");

export const getEmployee = (id: string) =>
  api.get<IEmployeeResponse>(`/employees/${id}`);

export const createEmployee = (
  data: IEmployeeRequest,
): Promise<IEmployeeResponse> =>
  api.post<IEmployeeResponse>(`/employees`, data);

export const editEmployee = (employeeId: string, data: IEmployeeRequest) =>
  api.put<IEmployeeResponse>(`/employees/${employeeId}`, data);

export const updateEmployeeProjects = (
  employeeId: string,
  data: UpdateEmployeeProjects,
) =>
  api.put<IEmployeeResponse>(
    `/employees/${employeeId}/update_employee_projects`,
    data,
  );

export const deleteEmployee = (id: string) => api.delete(`/employees/${id}`);

export const getMe = () => api.get<ICurrentUser>("/employees/me");
