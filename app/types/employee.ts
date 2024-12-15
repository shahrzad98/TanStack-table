interface IEmployeeMeta {
  count: number;
}

interface Role {
  name: string;
}

interface User {
  id: string;
  clerk_uid?: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string | null;
  phone_number?: string | null;
}

interface Company {
  id: string;
  name: string;
}

interface JiraAccount {
  id: string;
  account_id: string;
  remote_id: string;
}

export interface IEmployeeData {
  personal_email?: string | null;
  birth_date: string | undefined;
  date_started: string | undefined;
  contract_renewal_date: string | undefined;
  active: string | undefined;
  id: string;
  role: Role;
  user: User;
  company: Company;
  projects: any[];
  jira_account: JiraAccount;
}

export interface IEmployeeRequest {
  first_name: string;
  last_name: string;
  // avatar: string; // This line is commented out
  email: string;
  phone_number: string | null;
  birth_date: Date;
  date_started: Date;
  contract_renewal_date: Date;
  active: boolean;
  role_id: string;
  jira_account: JiraAccount;
}

export interface UpdateEmployeeProjects {
  projects: string[];
}
export interface IEmployeeResponse {
  data: IEmployeeData;
}

export interface IEmployeesResponse {
  data: IEmployeeData[];
  meta: IEmployeeMeta;
}
