import { HttpUtilsService } from './../../../modules/auth/crud/utils/http-utils.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TableService } from 'src/app/_metronic/shared/crud-table/services/table.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends TableService<any>  {
  constructor(@Inject(HttpClient) http, @Inject(HttpUtilsService) httpUtils, private cookie: CookieService) {
    super(http);
  }
  public RecountCart$ = new BehaviorSubject<boolean>(false);
  // constructor(private router: Router, private http: HttpClient) { }
  baseUrlAcount = environment.apiUrl + 'product/';
  getHttpHeaders() {


    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${this.cookie.get("accessToken")}`,
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  UpdateLuotMua(product_id, amount, slmua) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `UpdateLuotMua/${product_id}/${amount}/${slmua}`, null, { headers: httpHeader });
  }
  getListSPHome() {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `GetDSSPHome`, { headers: httpHeader });
  }
  GetDSSlideMini() {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `GetDSSlideMini`, { headers: httpHeader });
  }
  GetProductDetail(product_id: number) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `GetProductDetail/${product_id}`, { headers: httpHeader });
  }
  GetDSBest() {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `GetDSBest`, { headers: httpHeader });
  }
  CreateUser(item: any) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `Register`, item, { headers: httpHeader });
  }


  RemoveSp(produt_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `RemoveSp/${produt_id}`, null, { headers: httpHeader });
  }


  getImage(): Observable<any> {
    return this.http
      .get<any>('api/v1/productattribute/image')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getDetail(): Observable<any> {
    return this.http
      .get<any>('api/v1/productattribute/detail')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getColor(): Observable<any> {
    return this.http
      .get<any>('api/v1/productattribute/color')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertImage(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/productattribute/image', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertDetail(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/productattribute/detail', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insertColor(req: any): Observable<any> {
    return this.http
      .post<any>('api/v1/productattribute/color', req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(product: any): Observable<any> {
    return this.http
      .post<any>('api/v1/product', product)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>('api/v1/product/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteImage(id: any): Observable<any> {
    return this.http
      .delete<any>('api/v1/productattribute/image/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteDetail(id: any): Observable<any> {
    return this.http
      .delete<any>('api/v1/productattribute/detail/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteColor(id: any): Observable<any> {
    return this.http
      .delete<any>('api/v1/productattribute/color/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }



  getListSize(): Observable<any> {
    return this.http
      .get<any>('api/v1/product/sizes')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
