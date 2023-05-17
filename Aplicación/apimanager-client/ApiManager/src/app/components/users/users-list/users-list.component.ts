import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import {
  IEmployee,
  IEmployeeUpdate,
} from 'src/app/models/interfaces/employees/employee';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  employeeArray!: IEmployee[];
  @Input() searchText!: string;

  constructor(private employeeService: EmployeeService) {}

  @Output() userUpdate: EventEmitter<IEmployeeUpdate> =
    new EventEmitter<IEmployeeUpdate>();

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((resp) => {
      this.employeeArray = resp;
    });
  }

  updateUser(updatedUser: IEmployeeUpdate): void {
    this.userUpdate.emit(updatedUser);
  }

}
