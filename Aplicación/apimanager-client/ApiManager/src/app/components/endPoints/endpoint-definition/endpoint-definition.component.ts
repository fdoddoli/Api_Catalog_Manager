import { Component, OnInit, Input } from '@angular/core';
import { IDetailedEndpoint } from 'src/app/models/interfaces/endpoints/detailed-endpoint';

@Component({
  selector: 'app-endpoint-definition',
  templateUrl: './endpoint-definition.component.html',
  styleUrls: ['./endpoint-definition.component.css'],
})
export class EndpointDefinitionComponent implements OnInit {
  constructor() {}

  @Input() response!: any;
  @Input() detailedEndpoint!: IDetailedEndpoint;
  display: string = 'none';
  myOptions: object = { placement: 'top', showDelay: 200 };

  responseToShow!: any;

  ngOnInit(): void {
    this.changeResponseIdx(0);
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  changeResponseIdx(idx: number) {
    this.responseToShow = this.detailedEndpoint.responses[
      idx
    ].content.substring(0, 200);
  }
}
