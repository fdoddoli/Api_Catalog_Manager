import {
  AbstractControl,
  Form,
  FormGroup
} from "@angular/forms";
import { IEndPointsFormGroup } from "./new-detailed-endpoints";

interface IApis {
    name: string;
    author: string;
    description: string;
    base_url: string;
    categories: ICategory[];
}

interface ICategory
{
    name: string;
    endpoints: IEndPointsFormGroup[];
}


export interface IApisFormGroup extends FormGroup {
    value: IApis;

    controls: {
        name: FormGroup;
        author: FormGroup;
        description: FormGroup;
        base_url: FormGroup;
        categories: FormGroup; 
    };
  }