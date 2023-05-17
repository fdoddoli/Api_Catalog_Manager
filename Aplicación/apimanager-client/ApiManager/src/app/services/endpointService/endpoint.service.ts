import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  testEndpoint(id: number, result: number) {
    return this.http.put<object>(
      `${environment.baseURL}${environment.endpointPath}/${id}/test`,
      { result: result }
    );
  }
}
