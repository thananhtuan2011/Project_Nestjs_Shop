import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private router: Router, private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http
      .get<any>('api/v1/brand')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(brand: any): Observable<any> {
    return this.http
      .post<any>('api/v1/brand', brand)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>('api/v1/brand/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
