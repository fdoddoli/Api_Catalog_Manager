import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/apiService/api.service';
import { IDetailedEndpoint } from 'src/app/models/interfaces/endpoints/detailed-endpoint';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styleUrls: ['./endpoint-details.component.css'],
})
export class EndpointDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  detailedEndpoint!: IDetailedEndpoint;
  id!: any;
  response!: any;
  display: string = 'none';
  content: string = 'definition';
  @Input() base_url!: string;

  ngOnInit(): void {
    this.getIdRoute();
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  changeContent(content: string) {
    this.content = content;
  }

  getEndpointDetails(id: number): void {
    this.apiService.getEndpointDetails(id).subscribe((resp) => {
      this.detailedEndpoint = resp[0];
      this.response = this.detailedEndpoint.responses;
    });
  }

  getIdRoute(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('endpoint');
      if (this.id != 'intro') this.getEndpointDetails(this.id);
    });
  }
}
