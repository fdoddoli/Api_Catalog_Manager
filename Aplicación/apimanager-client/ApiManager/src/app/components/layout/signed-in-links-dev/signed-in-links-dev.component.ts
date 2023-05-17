import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import {SearchbarComponent} from '../searchbar/searchbar.component';

@Component({
  selector: 'app-signed-in-links-dev',
  templateUrl: './signed-in-links-dev.component.html',
  styleUrls: ['./signed-in-links-dev.component.css']
})
export class SignedInLinksDevComponent implements OnInit {

  router: Router;

  constructor(
    private msalService: MsalService,
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  signOut() {
    this.msalService.logoutPopup();
    sessionStorage.setItem('employeeRole', 'user-not-authenticated');
    this.router.navigate(['/notauth'])

  }

}
