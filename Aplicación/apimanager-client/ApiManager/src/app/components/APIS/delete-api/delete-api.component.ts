import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/apiService/api.service';
import { HotToastService, Toast } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-api',
  templateUrl: './delete-api.component.html',
  styleUrls: ['./delete-api.component.css'],
})
export class DeleteApiComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  newPopUpValue: boolean = true;

  @Input() apiId!: number;
  @Output() changePopUpState = new EventEmitter();

  closePopUp() {
    this.newPopUpValue = false;
    this.changePopUpState.emit(this.newPopUpValue);
  }

  deleteApi(): void {
    this.apiService
      .deleteApi(this.apiId)
      .subscribe(
        () =>
          (window.location.href =
            window.location.pathname + '?notify=deletedApiSuccess')
      );
  }
}
