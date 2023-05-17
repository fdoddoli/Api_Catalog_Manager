import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-signed-in-links-admin',
  templateUrl: './signed-in-links-admin.component.html',
  styleUrls: ['./signed-in-links-admin.component.css'],
})
export class SignedInLinksAdminComponent implements OnInit {
  modalState: boolean = false;
  router: Router;

  constructor(private msalService: MsalService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}

  openModal() {
    //funcion para abrir el modal
    this.modalState = true;
  }

  changeModal(newModalState) {
    this.modalState = newModalState;
  }

  signOut() {
    this.msalService.logoutPopup();
    sessionStorage.setItem('employeeRole', 'user-not-authenticated');
    this.router.navigate(['/notauth']);
  }
}
