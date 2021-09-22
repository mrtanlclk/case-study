import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/caterogy';
import { Product } from 'src/app/models/product';
import { CategoryServiceService } from 'src/app/services/catogery/category-service.service';
import { ProductServiceService } from 'src/app/services/product/product-service.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryServiceService
  ) {}

  title = 'PRODUCTS LIST';
  product: Product[] = [];
  category: Category[] = [];

  addform!: FormGroup;
  newProduct: Product = new Product();
  title2 = 'Product Add Form';

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.category = data;
    });
    this.createProduct();
  }

  getProducts() {
    this.activatedRoute.params.subscribe((params) => {
      this.productService
        .getProducts(params['Categoryid'])
        .subscribe((data) => {
          this.product = data;
        });
    });

    this.createProduct();
  }
  createProduct() {
    this.addform = this.formBuilder.group({
      id: ['', Validators.required],
      ProductName: ['', Validators.required],
      RelatedCategories: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPhoto: ['', Validators.required],
      ProductGender: ['', Validators.required],
      Price: ['', Validators.required],
      SalesQuantity: ['', Validators.required],
      Categoryid: ['', Validators.required],
    });
  }

  add() {
    this.newProduct = Object.assign({}, this.addform.value);
    this.productService.addProduct(this.newProduct).subscribe((data) => {
      this.newProduct = data;
    });
  }
}
