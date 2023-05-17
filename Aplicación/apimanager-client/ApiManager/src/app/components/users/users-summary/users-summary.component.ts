import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import {
  IEmployee,
  IEmployeeUpdate,
} from 'src/app/models/interfaces/employees/employee';

@Component({
  selector: 'app-users-summary',
  templateUrl: './users-summary.component.html',
  styleUrls: ['./users-summary.component.css'],
})
export class UsersSummaryComponent implements OnInit {
  constructor() {}

  @Input() userInfo: IEmployee;
  @Output() userUpdate: EventEmitter<IEmployeeUpdate> =
    new EventEmitter<IEmployeeUpdate>();

  ngOnInit(): void {}

  updateUser(event: Event): void {
    const selectorValue = (event.target as HTMLSelectElement).value === 'true';
    this.userUpdate.emit({
      updatedEmployee: {
        id: this.userInfo.id,
        is_admin: selectorValue,
      },
      pushFlag: selectorValue != this.userInfo.is_admin,
    });
  }
}
