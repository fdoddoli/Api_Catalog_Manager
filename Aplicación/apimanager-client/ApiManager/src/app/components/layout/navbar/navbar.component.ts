import { Component, OnInit } from '@angular/core';
import { SignedOutLinksComponent } from '../signed-out-links/signed-out-links.component';
import {SignedInLinksDevComponent} from '../signed-in-links-dev/signed-in-links-dev.component';
import {SignedInLinksAdminComponent} from '../signed-in-links-admin/signed-in-links-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  router: Router;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  getEmployeeRole(): string {
    return sessionStorage.getItem('employeeRole');
  }

}
