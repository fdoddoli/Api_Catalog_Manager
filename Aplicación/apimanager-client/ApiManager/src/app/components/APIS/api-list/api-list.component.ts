import { Component, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { ISummarizedApi } from 'src/app/models/interfaces/apis/summarized-api';
import { ApiService } from 'src/app/services/apiService/api.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css'],
})
export class ApiListComponent implements OnInit {
  apiArray!: ISummarizedApi[];
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.zone.run(() => {
      this.route.queryParams.subscribe((params) =>
        this.getApis(
          params['page'] ? params['page'] : 1,
          params['search'],
          params['availabilityFilter'],
          params['securityFilter']
        )
      );
    });
  }

  totalPages!: number;

  @Output() paginationInformation = new EventEmitter<number>();
  @Output() changePopUpState = new EventEmitter();

  getApis(
    page: number,
    searchQuery: string,
    availabilityFilter: string,
    securityFilter: string
  ): void {
    this.apiService
      .getApis(
        page,
        environment.resultsPerPage,
        searchQuery,
        availabilityFilter,
        securityFilter
      )
      .subscribe((resp) => {
        this.apiArray = resp['apis'];
        this.totalPages = resp['pages'];
        this.updateTotalPages(this.totalPages);
      });
  }

  updateTotalPages(totalPages) {
    this.paginationInformation.emit(totalPages);
  }

  updatePopUp(updatedValue) {
    this.changePopUpState.emit(updatedValue);
  }
}
