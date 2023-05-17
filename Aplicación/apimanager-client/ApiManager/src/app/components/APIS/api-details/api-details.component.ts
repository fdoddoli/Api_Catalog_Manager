import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService/api.service';
import { IDetailedApi } from 'src/app/models/interfaces/apis/detailed-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css'],
})
export class ApiDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  detailedApi!: IDetailedApi;
  id!: any;
  category!: any;
  pathIntroduction!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.category = params.get('category');
    });
    this.getApiDetails(this.id);
  }

  getApiDetails(id: number): void {
    this.apiService.getApiDetails(id).subscribe((resp) => {
      this.detailedApi = resp[0];
    });
  }
}
