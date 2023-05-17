import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  NgForm,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IEndPointsFormGroup } from 'src/app/models/interfaces/endpoints/new-detailed-endpoints';

@Component({
  selector: 'app-edit-api-modal',
  templateUrl: './edit-api-modal.component.html',
  styleUrls: ['./edit-api-modal.component.css'],
})
export class EditApiModalComponent implements OnInit {
  @Input() modalState: boolean;
  @Input() editData: FormGroup;
  @Output() modalOutput = new EventEmitter<boolean>();
  @Output() closeModalOutput = new EventEmitter<boolean>();
  @Output() modalDataOutput = new EventEmitter<boolean>();

  // OBJECT DECLARATIONS
  endPointsForm: FormGroup;
  queryParametersForm: FormGroup = new FormGroup({});
  bodyParametersForm: FormGroup = new FormGroup({});
  pathParametersForm: FormGroup = new FormGroup({});
  headerParametersForm: FormGroup = new FormGroup({});
  responsesForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  modalStateChange(): boolean {
    return (this.modalState = !this.modalState);
  }

  modalSendState() {
    let val = this.modalStateChange();
    this.modalOutput.emit(val);
  }

  closeModal() {
    let val = this.modalStateChange();
    this.closeModalOutput.emit(val);
  }

  modalSendData(val: any) {
    this.modalDataOutput.emit(val);
    this.modalSendState();
  }

  // FORM INITIALIZATION
  initializeForm(): void {
    this.endPointsForm = this.editData;
  }

  // QUERY PARAMETERS METHODS

  get query(): FormArray {
    return this.endPointsForm.get('queryParameters') as FormArray;
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

  removeQuery(index: number): void {
    this.query.removeAt(index);
  }

  // BODY PARAMETERS METHODS

  get body(): FormArray {
    return this.endPointsForm.get('bodyParameters') as FormArray;
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

  removeBody(index: number): void {
    this.body.removeAt(index);
  }

  // PATH PARAMETERS METHODS

  get path(): FormArray {
    return this.endPointsForm.get('pathParameters') as FormArray;
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

  removePath(index: number): void {
    this.path.removeAt(index);
  }

  // HEADER PARAMETERS METHODS

  get headers(): FormArray {
    return this.endPointsForm.get('headerParameters') as FormArray;
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

  removeHeader(index: number): void {
    this.headers.removeAt(index);
  }

  // RESPONSES METHODS

  get responses(): FormArray {
    return this.endPointsForm.get('responses') as FormArray;
  }

  addResponse(): void {
    this.responsesForm = this.fb.group({
      type: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    this.responses.push(this.responsesForm);
  }

  removeResponse(index: number): void {
    this.responses.removeAt(index);
  }
}
