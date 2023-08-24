import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccService {
  constructor(private router: Router, private http: HttpClient) { }

  login(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/account/login', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getList(): Observable<any> {
    return this.http
      .get<any>('api/v1/account')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updatePassword(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/account/updateInfo', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  register(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/account', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  findPass(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/sendEmail', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
