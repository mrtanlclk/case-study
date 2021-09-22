import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/caterogy';
import { Product } from 'src/app/models/product';
import { CategoryServiceService } from 'src/app/services/catogery/category-service.service';
import { ProductServiceService } from 'src/app/services/product/product-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private categoryService: CategoryServiceService
  ) {}

  product: Product[] = [];
  category: Category[] = [];

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
  }
  getProduct() {
    this.productService.getAllProducts().subscribe((data) => {
      this.product = data;
      this.TotalSales();
    });
  }
  getCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.category = data;
    });
  }

  arrayOfSales: number[] = [];
  arrayOfPrice: number[] = [];
  sum: number[] = [];
  totalOfAmount: number[] = [];

  TotalSales() {
    for (let i = 0; i < this.product.length; i++) {
      this.arrayOfSales[i] = this.product[i].SalesQuantity;
      this.arrayOfPrice[i] = this.product[i].Price;
      this.sum[i] = this.arrayOfPrice[i] * this.arrayOfSales[i];
    }
    console.log(this.sum);

    for (let i = 0, j = 0; i < this.sum.length; i = i + 3, j++) {
      this.totalOfAmount[j] = this.sum[i] + this.sum[i + 1] + this.sum[i + 2];
    }
    console.log(this.totalOfAmount);
  }
}
