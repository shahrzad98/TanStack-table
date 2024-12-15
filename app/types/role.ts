interface IRoleMeta {
  count: number;
}

export interface IRoleData {
  key?: number;
  id: string;
  name: string;
}

export interface IRoleResponse {
  data: IRoleData[];
  meta: IRoleMeta;
}
