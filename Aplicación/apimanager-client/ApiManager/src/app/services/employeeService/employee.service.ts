import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IEmployee } from 'src/app/models/interfaces/employees/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(
      `${environment.baseURL}${environment.employeesPath}`
    );
  }

  updateEmployees(updates: IEmployee[]): Observable<object> {
    return this.http.put<object>(
      `${environment.baseURL}${environment.employeesPath}/update`,
      { updates }
    );
  }

  validateEmail(email: string) {
    const options = {
      params: new HttpParams().set('email', email),
    };
    return this.http.get<string>(
      `${environment.baseURL}${environment.employeePath}/validate`,
      options
    );
  }
}
