import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IDetailedEndpoint } from 'src/app/models/interfaces/endpoints/detailed-endpoint';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { HotToastService } from '@ngneat/hot-toast';
import { EndpointService } from 'src/app/services/endpointService/endpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endpoint-test',
  templateUrl: './endpoint-test.component.html',
  styleUrls: ['./endpoint-test.component.css'],
})
export class EndpointTestComponent implements OnInit {
  constructor(
    private toast: HotToastService,
    private endpointService: EndpointService,
    private router: Router
  ) {}

  @Input() detailedEndpoint!: IDetailedEndpoint;
  @Input() base_url!: string;
  @Input() id_endpoint!: any;
  test_url!: string;
  myOptions: object = { placement: 'top', showDelay: 200 };

  queryParameters: Array<any> = [];
  pathParameters: Array<any> = [];
  headerParameters: Array<any> = [];
  bodyParameters: Array<any> = [];
  authenticationParameter: string = '';
  testResults!: any;

  ngOnInit(): void {
    this.test_url = this.base_url + this.detailedEndpoint.label;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // listen to changes of _data object and do something...
    this.testResults = '';
  }

  notify(type: string) {
    if (type == 'testSuccess') {
      this.toast.success('¡Se probó el API con exito!');
    } else if (type == 'badRequest') {
      this.toast.error(
        '¡Error, tu request es incompleto. Revisa que hayas incluido los parametros requeridos en tu request!'
      );
    } else if (type == 'unauthorized') {
      this.toast.error(
        '¡Error, necesitas autorización para hacer la llamada, revisa tu request!'
      );
    } else if (type == 'forbidden') {
      this.toast.error('¡Error, parece que la llamada está prohibida!');
    } else if (type == 'notFound') {
      this.toast.error(
        '¡Error parece que tu llama es incompleta o no se encontró, revisa tu request!'
      );
    } else if (type == 'internalServerError') {
      this.toast.error('¡Error, parece que hay un internal server error!');
    } else if (type == 'notImplemented') {
      this.toast.error(
        '¡Error, parece que el api no se ha implementado. El sistema ha notificado el error!'
      );
    } else if (type == 'zero') {
      this.toast.error('¡Error, no se encontró el api!');
    }
  }

  setAuthentication(api_key: string) {
    this.authenticationParameter = api_key;
  }

  setQueryParameter(query: string, parameter: string, idx: any) {
    let queryParameter: object = {};
    queryParameter['query'] = query;
    queryParameter['parameter'] = parameter;

    this.queryParameters[idx] = queryParameter;
  }

  setPathParameter(query: string, parameter: string, idx: any) {
    let pathParameter: object = {};
    pathParameter['query'] = query;
    pathParameter['parameter'] = parameter;
    this.pathParameters[idx] = pathParameter;
  }

  setHeaderParameter(query: string, parameter: string, idx: any) {
    let headerParameter: object = {};
    headerParameter['query'] = query;
    headerParameter['parameter'] = parameter;
    this.headerParameters[idx] = headerParameter;
  }

  setBodyParameter(query: string, parameter: string, idx: any) {
    let bodyParameter: object = {};
    bodyParameter['query'] = query;
    bodyParameter['parameter'] = parameter;
    this.bodyParameters[idx] = bodyParameter;
  }

  getQueryURL(): string {
    let queries = '';

    if (this.queryParameters.length > 0) {
      for (let i = 0; i < this.queryParameters.length; i++) {
        if (
          this.queryParameters[i] != null &&
          this.queryParameters[i].query != null &&
          this.queryParameters[i].query != ''
        ) {
          queries =
            queries +
            this.queryParameters[i].parameter +
            '=' +
            this.queryParameters[i].query +
            '&';
        }
      }
      //Remove last & from query
      queries = queries.slice(0, -1);
    }
    return queries;
  }

  getPathParametersURL(): string {
    let parametersURL = this.detailedEndpoint.label;
    let pathParameters = this.pathParameters;
    if (this.pathParameters.length > 0) {
      for (let i = 0; i < this.pathParameters.length; i++) {
        if (
          this.pathParameters[i] != null &&
          this.pathParameters[i].query != null &&
          this.pathParameters[i].query != ''
        ) {
          let parameterToReplace = '{' + this.pathParameters[i].parameter + '}';
          parametersURL = parametersURL.replace(
            parameterToReplace,
            this.pathParameters[i].query
          );
        }
      }
    }
    return parametersURL;
  }

  getTestURL(): string {
    //Get all queryParameters as a formatted string, add them to test url
    this.test_url = this.base_url;
    let queries = this.getQueryURL();
    let pathParameters = this.getPathParametersURL();
    this.test_url = this.test_url + pathParameters + '?' + queries;
    return this.test_url;
  }

  getHeader() {
    let headerParameters = this.headerParameters;
    //Iterar arreglo de headerParameters
    //Para cada item,
    const headers: Record<string, string> = {};
    if (headerParameters.length > 0) {
      for (let i = 0; i < headerParameters.length; i++) {
        if (
          this.headerParameters[i] != null &&
          this.headerParameters[i].query != null &&
          this.headerParameters[i].query != ''
        ) {
          headers[this.headerParameters[i].parameter] =
            this.headerParameters[i].query;
        }
      }
    }
    return headers;
  }

  getBody() {
    const body: Record<string, any> = {};
    if (this.bodyParameters.length > 0) {
      for (let i = 0; i < this.bodyParameters.length; i++) {
        if (
          this.bodyParameters[i] != null &&
          this.bodyParameters[i].query != null &&
          this.bodyParameters[i].query != ''
        ) {
          body[this.bodyParameters[i].parameter] = this.bodyParameters[i].query;
        }
      }
    }
    return body;
  }

  testEndpoint(id: number, result: number) {
    this.endpointService.testEndpoint(id, result).subscribe((resp) => {
      this.router.navigate([window.location]);
    });
  }

  apiCall(config: object) {
    axios(config)
      .then((response) => {
        this.testResults = JSON.stringify(response.data);
        this.notify('testSuccess');
        //Llamar función para indicar que api está up
        this.testEndpoint(this.id_endpoint, 1);
        return JSON.stringify(response.data);
      })
      .catch((error) => {
        console.log(error);
        let errorStatus = error.response.status;
        console.log(errorStatus);
        //Toast de que fue un mal request
        if (errorStatus == 0) {
          this.notify('zero');
        } else if (errorStatus == 400) {
          this.notify('badRequest');
        } else if (errorStatus == 401) {
          this.notify('unauthorized');
        } else if (errorStatus == 403) {
          this.notify('forbidden');
        } else if (errorStatus == 404) {
          this.notify('notFound');
          this.testEndpoint(this.id_endpoint, 0);
        } else if (errorStatus == 500) {
          this.notify('internalServerError');
          //Llamar función para indicar que api está down
          this.testEndpoint(this.id_endpoint, 0);
        } else if (errorStatus == 501) {
          this.notify('notImplemented');
          //Llamar función para indicar que api está down
          this.testEndpoint(this.id_endpoint, 0);
        }
      });
  }

  async testAPI() {
    //DYNAMIC URL
    let url = this.getTestURL();

    //DYNAMIC HEADER
    let headers;
    if (this.headerParameters.length > 0) {
      headers = this.getHeader();
    } else {
      headers = {
        'Content-Type': 'application/json',
      };
    }

    //DYNAMIC METHOD
    let method = this.detailedEndpoint.method;

    //DYNAMIC BODY
    let data = this.getBody();

    //For movie database
    //PRUEBAS
    //#1 Endpoint de Get Details para QUERY y PARAMETROS
    //api: 934eca793c1f58441a9286fa9184aa72
    //MovieID: 952423
    //#2 Endpoint de Rate Movie para QUERY y PARAMETROS y Header y Body
    //guest session id: 31ab33996878b357b5175348f0a848e8
    //api: 934eca793c1f58441a9286fa9184aa72
    //movie_id: 952423
    //Body: 8.5
    //header: application/json;charset=utf-8

    let config = {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };

    let result = await this.apiCall(config);
  }
}
