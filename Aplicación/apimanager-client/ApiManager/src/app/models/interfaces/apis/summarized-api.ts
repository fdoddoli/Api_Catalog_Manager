export interface IPaginatedApiList {
  pages: number;
  apis: ISummarizedApi[];
}

export interface ISummarizedApi {
  id: number;
  name: string;
  availability: number;
  is_safe: boolean;
  author: string;
  description: string;
  last_tested?: string;
}
