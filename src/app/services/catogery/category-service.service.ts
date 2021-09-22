import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from 'src/app/models/caterogy';
import { environment } from 'src/environments/environment';

import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  constructor(private http: HttpClient) {}

  path = environment.url + '/categories';

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMassage = '';
    if (err.error instanceof ErrorEvent) {
      errorMassage = 'Bir hata oluştu' + err.error.message;
    } else {
      errorMassage = 'Sistemsel bir hata';
    }
    return throwError(errorMassage);
  }

  addCategory(category: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.post<Category>(this.path, category, httpOptions).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
}
