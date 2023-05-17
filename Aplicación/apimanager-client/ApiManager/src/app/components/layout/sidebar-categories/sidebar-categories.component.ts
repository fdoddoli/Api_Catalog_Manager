import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/interfaces/apis/detailed-api';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-categories',
  templateUrl: './sidebar-categories.component.html',
  styleUrls: ['./sidebar-categories.component.css'],
})
export class SidebarCategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  id!: any;
  availabilityColors: string[] = ['danger', 'success', 'secondary'];

  @Input() category!: ICategory;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}
