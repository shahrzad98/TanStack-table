export interface ICurrentUserStorage {
  state: {
    currentUser: ICurrentUser;
  };
}

export interface ICurrentUser {
  data: IUserResponse;
  expiry: number;
}

export interface IUserStore {
  currentUser: ICurrentUser | null;
  setUser: (user: any) => void;
  logout: () => void;
  isAuth: () => boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
  remember: boolean;
}

interface Role {
  name: string;
}

interface Company {
  id: string;
  name: string;
}

interface ClerkUser {
  id: string;
  clerk_uid: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone_number: string;
}

interface Employee {
  id: string;
  role: Role;
  company: Company;
  jira_account: any;
  user: ClerkUser;
}

export interface IUserResponse extends ClerkUser {
  employees: Employee[];
  permissions: any[];
}

export interface ILogoutResponse {
  message: string;
}
