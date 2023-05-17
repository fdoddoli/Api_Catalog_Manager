import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApisFormGroup } from 'src/app/models/interfaces/endpoints/new-detailed-apis';
import { IDetailedApi } from 'src/app/models/interfaces/apis/detailed-api';
import { IDetailedEndpoint } from 'src/app/models/interfaces/endpoints/detailed-endpoint';
import { IPaginatedApiList } from 'src/app/models/interfaces/apis/summarized-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  filterGetApisParams(
    page: number,
    resultsPerPage: number,
    searchQuery: string,
    availabilityFilter: string,
    securityFilter: string
  ): HttpParams {
    let params = new HttpParams();
    const availabilityStatus: Record<string, number> = {
      'not-tested': 0,
      unavailable: 1,
      'semi-available': 2,
      available: 3,
    };
    const securityStatus: Record<string, number> = {
      unsafe: 0,
      safe: 1,
    };

    params = params.set('page', page);
    params = params.set('resultsPerPage', resultsPerPage);
    if (searchQuery) params = params.set('searchQuery', searchQuery);
    if (availabilityStatus[availabilityFilter] >= 0)
      params = params.set(
        'availabilityFilter',
        availabilityStatus[availabilityFilter]
      );
    if (securityStatus[securityFilter] >= 0)
      params = params.set('securityFilter', securityStatus[securityFilter]);

    return params;
  }
  getApis(
    page: number,
    resultsPerPage: number,
    searchQuery: string,
    availabilityFilter: string,
    securityFilter: string
  ) {
    const httpParams = this.filterGetApisParams(
      page,
      resultsPerPage,
      searchQuery,
      availabilityFilter,
      securityFilter
    );
    return this.http.get<IPaginatedApiList>(
      `${environment.baseURL}${environment.apisPath}`,
      { params: httpParams }
    );
  }
  getFullApiDetails(id: number) {
    return this.http.get<IApisFormGroup>(
      `${environment.baseURL}${environment.apiPath}/${id}/full-details`
    );
  }
  getApiDetails(id: number) {
    return this.http.get<IDetailedApi[]>(
      `${environment.baseURL}${environment.apiPath}/${id}/details`
    );
  }
  getEndpointDetails(id: number) {
    return this.http.get<IDetailedEndpoint[]>(
      `${environment.baseURL}${environment.endpointPath}/${id}/details`
    );
  }
  addApi(api: IApisFormGroup): Observable<object> {
    return this.http.post<IApisFormGroup>(
      `${environment.baseURL}${environment.apiPath}/add`,
      api
    );
  }
  editApi(id: number, api: IApisFormGroup): Observable<object> {
    return this.http.put<IApisFormGroup>(
      `${environment.baseURL}${environment.apiPath}/${id}/edit`,
      api
    );
  }
  deleteApi(id: number): Observable<object> {
    return this.http.delete<object>(
      `${environment.baseURL}${environment.apiPath}/${id}/delete`,
      {}
    );
  }
}
