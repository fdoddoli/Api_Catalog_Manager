import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { IApisFormGroup } from 'src/app/models/interfaces/endpoints/new-detailed-apis';
import { ApiService } from 'src/app/services/apiService/api.service';

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.css'],
})
export class EditAPIComponent implements OnInit {
  apiId!: number;
  endPointIndex: number = 0;
  categoryIndex: number = 0;
  addModalState: boolean = false;
  editModalState: boolean = false;
  elementByIndex: AbstractControl;
  apiData!: IApisFormGroup;
  grabIndex: AbstractControl;
  nuevoEjemplo: any;

  apiForm: FormGroup;
  categoryForm: FormGroup = new FormGroup({});
  endPointsForm: FormGroup = new FormGroup({});
  queryParametersForm: FormGroup = new FormGroup({});
  bodyParametersForm: FormGroup = new FormGroup({});
  pathParametersForm: FormGroup = new FormGroup({});
  headerParametersForm: FormGroup = new FormGroup({});
  responsesForm: FormGroup = new FormGroup({});
  private routeSub: Subscription;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.apiId = params['id'];
      this.getApiData(this.apiId);
    });
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
    });
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
    let createFormArray = this.apiForm.get('categories') as FormArray;
    this.elementByIndex = createFormArray.at(this.categoryIndex);
    return createFormArray;
  }

  // ENDPOINTS METHODS
  get endpoint(): FormArray {
    let createFormArray = this.categoryForm.get('endpoints') as FormArray;
    return createFormArray;
  }

  addEndPoint(): void {
    this.endPointsForm = this.fb.group({
      method: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
      requires_auth: ['', [Validators.required]],
      queryParameters: this.fb.array([]),
      bodyParameters: this.fb.array([]),
      pathParameters: this.fb.array([]),
      headerParameters: this.fb.array([]),
      responses: this.fb.array([]),
    });

    this.endpoint.push(this.endPointsForm);
  }

  // QUERY METHODS

  get query(): FormArray {
    let createFormArray = this.endPointsForm.get(
      'queryParameters'
    ) as FormArray;
    return createFormArray;
  }

  addQuery(): void {
    this.queryParametersForm = this.fb.group({
      data_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      required: ['', [Validators.required]],
    });

    this.query.push(this.queryParametersForm);
  }

  // BODY METHODS

  get body(): FormArray {
    let createFormArray = this.endPointsForm.get('bodyParameters') as FormArray;
    return createFormArray;
  }

  addBody(): void {
    this.bodyParametersForm = this.fb.group({
      data_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      payload: [''],
      required: ['', [Validators.required]],
    });

    this.body.push(this.bodyParametersForm);
  }

  // PATH METHODS

  get path(): FormArray {
    let createFormArray = this.endPointsForm.get('pathParameters') as FormArray;
    return createFormArray;
  }

  addPath(): void {
    this.pathParametersForm = this.fb.group({
      data_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      required: ['', [Validators.required]],
    });

    this.path.push(this.pathParametersForm);
  }

  // HEADER METHODS

  get headers(): FormArray {
    let createFormArray = this.endPointsForm.get(
      'headerParameters'
    ) as FormArray;
    return createFormArray;
  }

  addHeader(): void {
    this.headerParametersForm = this.fb.group({
      data_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      required: ['', [Validators.required]],
    });

    this.headers.push(this.headerParametersForm);
  }

  // RESPONSES METHODS

  get responses(): FormArray {
    let createFormArray = this.endPointsForm.get('responses') as FormArray;
    return createFormArray;
  }

  addResponse(): void {
    this.responsesForm = this.fb.group({
      type: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    this.responses.push(this.responsesForm);
  }

  removeEndPoint(endPointIndex: number, catIndex: number): void {
    this.getIndex(catIndex);
    let createFormArray = this.apiForm.controls['categories'] as FormArray;
    let FormArrayAtIndex = createFormArray.at(this.categoryIndex);
    (FormArrayAtIndex.get('endpoints') as FormArray).removeAt(endPointIndex);
  }

  sendEditData(): FormGroup {
    // this.getIndex(this.endPointIndex);
    let createFormArray = this.apiForm.controls['categories'] as FormArray;
    let formArrayAtCatIndex = createFormArray.at(this.categoryIndex);
    let formArrayAtEpIndex = formArrayAtCatIndex.get('endpoints') as FormArray;
    return formArrayAtEpIndex.at(this.endPointIndex) as FormGroup;
  }

  get outputEndPoint(): FormArray {
    this.categoryForm;
    return this.elementByIndex.get('endpoints') as FormArray;
  }

  fillQuery(catIndex: number, epIndex: number): void {
    this.apiData['categories'][catIndex]['endpoints'][epIndex][
      'queryParameters'
    ]?.forEach(() => {
      this.endPointIndex = epIndex;
      this.addQuery();
    });
  }

  fillBody(catIndex: number, epIndex: number): void {
    this.apiData['categories'][catIndex]['endpoints'][epIndex][
      'bodyParameters'
    ]?.forEach(() => {
      this.endPointIndex = epIndex;
      this.addBody();
    });
  }

  fillPath(catIndex: number, epIndex: number): void {
    this.apiData['categories'][catIndex]['endpoints'][epIndex][
      'pathParameters'
    ]?.forEach(() => {
      this.endPointIndex = epIndex;
      this.addPath();
    });
  }

  fillHeader(catIndex: number, epIndex: number): void {
    this.apiData['categories'][catIndex]['endpoints'][epIndex][
      'headerParameters'
    ]?.forEach(() => {
      this.endPointIndex = epIndex;
      this.addHeader();
    });
  }

  fillResponses(catIndex: number, epIndex: number): void {
    this.apiData['categories'][catIndex]['endpoints'][epIndex][
      'responses'
    ]?.forEach(() => {
      this.endPointIndex = epIndex;
      this.addResponse();
    });
  }

  fillEndPoints(i: number): void {
    let j = 0;
    this.apiData['categories'][i]['endpoints']?.forEach(() => {
      this.categoryIndex = i;
      this.addEndPoint();
      this.fillQuery(i, j);
      this.fillBody(i, j);
      this.fillPath(i, j);
      this.fillHeader(i, j);
      this.fillResponses(i, j);
      j++;
    });
  }

  //FILL FORM
  fillForm(): void {
    let i = 0;
    this.apiData['categories']?.forEach(() => {
      this.addCategory();
      this.fillEndPoints(i);
      i++;
    });

    // Despues de que el formulario se genere se le asignan los valores
    // de nuestro JSON

    this.apiForm.setValue({
      name: this.apiData['name'],
      author: this.apiData['author'],
      description: this.apiData['description'],
      base_url: this.apiData['base_url'],
      categories: this.apiData['categories'],
    });
  }

  // // SUBMIT METHODS

  onSubmit(): void {
    this.editApi(this.apiId, this.apiForm.value);
  }

  addApi(newApi: IApisFormGroup): void {
    this.apiService.addApi(newApi).subscribe((data) => {
      console.log(data);
    });
  }

  getApiData(id: number) {
    this.apiService.getFullApiDetails(id).subscribe((resp: IApisFormGroup) => {
      this.apiData = resp;
      this.initializeForm();
      this.fillForm();
    });
  }

  editApi(id: number, apiData: IApisFormGroup) {
    this.apiService.editApi(id, apiData).subscribe((resp) => {
      this.router.navigate(['/home']);
    });
  }

  showsToast() {
    this.toast.success('Se editó el API exitosamente');
  }
}
