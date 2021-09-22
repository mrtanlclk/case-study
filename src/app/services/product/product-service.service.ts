import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  path = environment.url + '/products';

  getProducts(Categoryid: string): Observable<Product[]> {
    let newPath = this.path;
    if (Categoryid) {
      newPath += '?Categoryid=' + Categoryid;
    }

    return this.http.get<Product[]>(newPath).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluştu' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata';
    }
    return throwError(errorMessage);
  }

  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.post<Product>(this.path, product, httpOptions).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
}
