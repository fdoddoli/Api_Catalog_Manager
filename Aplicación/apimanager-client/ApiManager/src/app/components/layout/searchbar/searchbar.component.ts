import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  searchBarForm!: FormGroup;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchBarForm = new FormGroup({
        searchQuery: new FormControl(params['search']),
      });
    });
  }

  submitSearchQuery() {
    const search = this.searchBarForm.controls['searchQuery'].value;
    this.router.navigate(['/home'], {
      queryParams: { search: search == '' ? null : search },
      queryParamsHandling: 'merge',
    });
  }
}
