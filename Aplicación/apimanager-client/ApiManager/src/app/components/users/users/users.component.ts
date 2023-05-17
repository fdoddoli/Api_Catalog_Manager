import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  IEmployee,
  IEmployeeUpdate,
} from 'src/app/models/interfaces/employees/employee';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  updates!: IEmployee[];
  searchText: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.updates = [];
  }

  newModalState: boolean = true;

  @Output()
  changeModalState = new EventEmitter();

  closeModal() {
    this.newModalState = false;
    this.changeModalState.emit(this.newModalState);
  }

  updateUser(updatedUser: IEmployeeUpdate) {
    if (updatedUser.pushFlag) this.updates.push(updatedUser.updatedEmployee);
    else {
      const idx = this.updates
        .map((u) => {
          return u.id;
        })
        .indexOf(updatedUser.updatedEmployee.id);
      this.updates.splice(idx, 1);
    }
  }

  updateEmployees(updates: IEmployee[]): void {
    this.employeeService
      .updateEmployees(updates)
      .subscribe(
        () =>
          (window.location.href =
            window.location.pathname + '?notify=userUpdateSuccess')
      );
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
}
