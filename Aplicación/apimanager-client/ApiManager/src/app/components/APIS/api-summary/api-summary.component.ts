import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISummarizedApi } from 'src/app/models/interfaces/apis/summarized-api';
import { ApiService } from 'src/app/services/apiService/api.service';

@Component({
  selector: 'app-api-summary',
  templateUrl: './api-summary.component.html',
  styleUrls: ['./api-summary.component.css'],
})
export class ApiSummaryComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  @Input() data!: ISummarizedApi;

  ngOnInit(): void {
    this.getAPI();
  }

  points!: string;
  tooltipMessage!: string;
  hoverState: boolean = false;
  availabilityColors: string[] = ['secondary', 'danger', 'warning', 'success'];
  popUpState: boolean = false;
  myOptions: object = { placement: 'top', showDelay: 400 };

  @Output() changePopUpState = new EventEmitter();

  getAPI(): void {
    if (this.data.description.length > 80) {
      this.points = '...';
    } else {
      this.points = '';
    }
    this.tooltipMessage = this.data.last_tested
      ? 'Última vez probada en ' + this.data.last_tested
      : 'API no probada';
  }

  openPopUp() {
    this.popUpState = true;
    this.changePopUpState.emit({
      popUpState: this.popUpState,
      id: this.data.id,
    });
  }

  changeModal(newModalState) {
    this.popUpState = newModalState;
  }

  isAdmin() {
    return sessionStorage.getItem('employeeRole') === 'admin';
  }
}
