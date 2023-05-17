export interface IEmployee {
  id: number;
  name?: string;
  email?: string;
  is_admin: boolean;
}

export interface IEmployeeUpdate {
  updatedEmployee: IEmployee;
  pushFlag: boolean;
}
