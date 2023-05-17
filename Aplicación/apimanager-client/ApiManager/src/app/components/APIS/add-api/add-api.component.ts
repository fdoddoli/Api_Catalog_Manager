import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/apiService/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IApisFormGroup } from 'src/app/models/interfaces/endpoints/new-detailed-apis';
import { HotToastService } from '@ngneat/hot-toast';

declare let window: any;

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css'],
})
export class AddAPIComponent implements OnInit {
  endPointIndex: number = 0;
  categoryIndex: number = 0;
  addModalState: boolean = false;
  editModalState: boolean = false;
  nuevoEjemplo: AbstractControl;

  apiForm: FormGroup;
  categoryForm: FormGroup = new FormGroup({});
  endPointsForm: FormGroup = new FormGroup({});
  queryParametersForm: FormGroup = new FormGroup({});
  bodyParametersForm: FormGroup = new FormGroup({});
  pathParametersForm: FormGroup = new FormGroup({});
  headerParametersForm: FormGroup = new FormGroup({});
  responsesForm: FormGroup = new FormGroup({});

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // MODAL METHODS
  addModalStateReceiver(value: boolean): void {
    this.addModalState = value;
  }

  addModalStateManager(): void {
    this.addModalState = !this.addModalState;
  }

  addModalDataReceiver(val): void {
    this.outputEndPoint.push(val);
  }

  // EDIT MODAL METHODS

  editModalStateReceiver(value: boolean): void {
    this.editModalState = value;
  }

  editModalStateManager(): void {
    this.editModalState = !this.editModalState;
  }

  // INDEX TRACKING
  getIndex(i: number): void {
    this.categoryIndex = i;
  }

  getEndPointIndex(i: number, j: number): void {
    this.categoryIndex = i;
    this.endPointIndex = j;
  }

  // FORM INITIALIZATION
  initializeForm(): void {
    this.apiForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      base_url: ['', [Validators.required]],
      categories: this.fb.array([]),
    }) as IApisFormGroup;
  }

  // CATEGORY METHODS

  addCategory(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      endpoints: this.fb.array([]),
    });

    this.categories.push(this.categoryForm);
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  get categories(): FormArray {
    let ejemplo = this.apiForm.controls['categories'] as FormArray;
    this.nuevoEjemplo = ejemplo.at(this.categoryIndex);
    return ejemplo;
  }

  // ENDPOINTS METHODS

  get endpoints(): FormArray {
    return this.categoryForm.get('endpoints') as FormArray;
  }

  removeEndPoint(endPointIndex: number, catIndex: number): void {
    this.getIndex(catIndex);
    let ejemplo = this.apiForm.controls['categories'] as FormArray;
    this.nuevoEjemplo = ejemplo.at(this.categoryIndex);
    (this.nuevoEjemplo.get('endpoints') as FormArray).removeAt(endPointIndex);
  }

  sendEditData(): FormGroup {
    this.getIndex(this.endPointIndex);
    let ejemplo = this.apiForm.controls['categories'] as FormArray;
    this.nuevoEjemplo = ejemplo.at(this.categoryIndex);
    let ejemplo2 = this.nuevoEjemplo.get('endpoints') as FormArray;
    return ejemplo2.at(this.endPointIndex) as FormGroup;
  }

  get outputEndPoint(): FormArray {
    this.categoryForm;
    return this.nuevoEjemplo.get('endpoints') as FormArray;
  }

  onSubmit(): void {
    this.addApi(this.apiForm.value);
  }

  addApi(newApi: IApisFormGroup): void {
    this.apiService.addApi(newApi).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }

  showsToast() {
    this.toast.success('Se agregó el API exitosamente');
  }
}
