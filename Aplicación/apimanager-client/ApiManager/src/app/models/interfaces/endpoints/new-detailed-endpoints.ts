import {
  AbstractControl,
  FormGroup
} from "@angular/forms";

interface IEndPoints {
  method: number;
  name: string;
  description: string;
  url: string;
  requires_auth: boolean;
  queryParameters: INewParameter[];
  bodyParameters: INewParameter[];
  pathParameters: INewParameter[];
  headerParameters: INewParameter[];
  responses: INewResponse[];
}

interface INewParameter {
  data_type: number;
  name: string;
  description?: string;
  payload?:string;
  required: boolean;
}

interface INewResponse {
  type: number;
  content?: string;
}

export interface IEndPointsFormGroup extends FormGroup {
  value: IEndPoints;

  // We need to add these manually again, same fields as IUser
  controls: {
    method: AbstractControl;
    name: AbstractControl;
    description: AbstractControl;
    url: AbstractControl;
    requires_auth: AbstractControl;
    queryParameters: AbstractControl;
    bodyParameters: AbstractControl;
    pathParameters: AbstractControl;
    headerParameters: AbstractControl;
    responses: AbstractControl;
  };
}
