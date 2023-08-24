import { HttpUtilsService } from './../../../../modules/auth/crud/utils/http-utils.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TableService } from 'src/app/_metronic/shared/crud-table/services/table.service';

@Injectable({
    providedIn: 'root',
})
export class TopbarService extends TableService<any>  {
    constructor(@Inject(HttpClient) http, @Inject(HttpUtilsService) httpUtils) {
        super(http);
    }

    // constructor(private router: Router, private http: HttpClient) { }
    baseUrlAcount = environment.apiUrl + 'order/';
    baseUrlDonhang = environment.apiUrl + 'donhang/';
    GetDonHangXacNhanByAcount(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `GetDonHangXacNhanByAcount?acount_id=${acount_id}`, { headers: httpHeader });
    }
    getHttpHeaders() {


        // console.log('auth.token',auth.access_token)
        let result = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return result;
    }

    GetCartByAcount(id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlAcount + `GetCartByAcount?account_id=${id}`, { headers: httpHeader });
    }
    GetCountCart(id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlAcount + `GetCountCart?account_id=${id}`, { headers: httpHeader });
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
