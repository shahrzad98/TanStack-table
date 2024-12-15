interface IJiraUserMeta {
  count: number;
}

export interface IJiraUserData {
  account_id: string;
  remote_id: string;
  name: string;
}

export interface IJiraUserResponse {
  data: IJiraUserData[];
  meta: IJiraUserMeta;
}
