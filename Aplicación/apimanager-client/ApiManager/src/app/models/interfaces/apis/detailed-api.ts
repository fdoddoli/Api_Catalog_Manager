export interface IDetailedApi {
  name: string;
  description: string;
  base_url: string;
  categories: ICategory[];
}

export interface ICategory {
  name: string;
  endpoints: ISummarizedEndpoint[];
}

export interface ISummarizedEndpoint {
  id: number;
  method: string;
  label: string;
  name: string;
  is_available?: number;
}
