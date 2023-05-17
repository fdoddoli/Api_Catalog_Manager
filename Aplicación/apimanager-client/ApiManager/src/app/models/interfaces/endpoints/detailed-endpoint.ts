export interface IDetailedEndpoint {
  method: string;
  label: string;
  name: string;
  description: string;
  url: string;
  requires_auth: boolean;
  last_test_result?: boolean;
  last_test_date?: string;
  queryParameters?: IParameter[];
  bodyParameters?: IParameter[];
  pathParameters?: IParameter[];
  headerParameters?: IParameter[];
  responses: IResponse[];
}

export interface IParameter {
  data_type: string;
  name: string;
  description?: string;
  payload?: string;
  required: boolean;
}

export interface IResponse {
  type: number;
  content: string;
}
