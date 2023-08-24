import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private router: Router, private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http
      .get<any>('api/v1/comment')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(comment: any): Observable<any> {
    return this.http
      .post<any>('api/v1/comment', comment)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(+ 'api/v1/comment/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
