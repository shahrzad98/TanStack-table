export interface ICompaniesResponse {
  data: ICompanyData[];
  meta: ICompanyMeta;
}

export interface ICompanyResponse {
  data: ICompanyData;
}

export interface ICompanyData {
  id: string;
  name: string;
}

interface ICompanyMeta {
  count: number;
}
