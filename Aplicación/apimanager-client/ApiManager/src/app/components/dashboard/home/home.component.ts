import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.initializeQueryParams(
        params['availabilityFilter'],
        params['securityFilter'],
        params['page'] ? parseInt(params['page']) : 1
      );
      if (params['notify']) this.notify(params['notify']);
    });
  }

  ngOnInit(): void {}

  currentPage!: number;
  totalPages!: number;
  securityFilter!: string;
  availabilityFilter!: string;
  popUpStateValue: boolean = false;
  deletedApiId!: number;
  sessionValue!: string;

  initializeQueryParams(
    availabilityFilter: string,
    securityFilter: string,
    currentPage: number
  ): void {
    this.availabilityFilter = availabilityFilter;
    this.securityFilter = securityFilter;
    this.currentPage = currentPage;
  }

  setAvailabilityFilter(filter: string): void {
    this.availabilityFilter = filter;
    this.router.navigate(['/home'], {
      queryParams: { availabilityFilter: filter, page: null },
      queryParamsHandling: 'merge',
    });
  }

  setSecurityFilter(filter: string): void {
    this.securityFilter = filter;
    this.router.navigate(['/home'], {
      queryParams: { securityFilter: filter, page: null },
      queryParamsHandling: 'merge',
    });
  }

  changePopUpValue(value) {
    this.popUpStateValue = value.popUpState;
    this.deletedApiId = value.id;
  }

  updateTotalPages(totalPages) {
    if (this.currentPage < 1 || this.currentPage > totalPages) {
      this.router.navigate(['/home'], {
        queryParams: { page: null },
        queryParamsHandling: 'merge',
      });
    }
    this.totalPages = totalPages;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.router.navigate(['/home'], {
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.router.navigate(
        ['/home'],
        this.currentPage == 1
          ? {
              queryParams: { page: null },
              queryParamsHandling: 'merge',
            }
          : {
              queryParams: { page: this.currentPage },
              queryParamsHandling: 'merge',
            }
      );
    }
  }

  translateAVFilter() {
    switch (this.availabilityFilter) {
      case 'available':
        return 'Disponible';
      case 'semi-available':
        return 'Semi Disponible';
      case 'unavailable':
        return 'No Disponible';
      case 'not-tested':
        return 'Sin Probar';
      default:
        return 'Disponibilidad';
    }
  }

  translateSECFilter() {
    switch (this.securityFilter) {
      case 'safe':
        return 'Seguro';
      case 'unsafe':
        return 'Inseguro';
      default:
        return 'Seguridad';
    }
  }

  notify(notification: string) {
    if (notification == 'deletedApiSuccess') {
      this.toast.success('Se eliminó el API exitosamente');
    }
    if (notification == 'userUpdateSuccess') {
      this.toast.success('Se actualizaron los usuarios exitosamente');
    }
    this.router.navigate(['/home']);
  }
}
