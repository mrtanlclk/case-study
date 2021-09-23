import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/caterogy';
import { CategoryServiceService } from 'src/app/services/catogery/category-service.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
  providers: [],
})
export class CategoryPageComponent implements OnInit {
  constructor(
    private categoryService: CategoryServiceService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
  ) {}

  title = 'CATEGORIES';
  category: Category[] = [];

  form!: FormGroup;
  newCategory: Category = new Category();
  title2 = 'Category Add Form';

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.category = data;
    });
    this.createCategory();
  }
  createCategory() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      CategoryName: ['', Validators.required],
      ParentCategory: ['', Validators.required],
      CategoryDescription: ['', Validators.required],
      CategoryPhoto: ['', Validators.required],
    });
  }

  add() {
    this.newCategory = Object.assign({}, this.form.value);
    this.categoryService.addCategory(this.newCategory).subscribe((data) => {
      this.newCategory = data;
      this.getCategories();
    });
  }
}
