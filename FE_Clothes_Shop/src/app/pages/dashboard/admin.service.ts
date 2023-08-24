import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    public Bieudo = new Subject<any>();
    constructor(private router: Router, private http: HttpClient) { }
    baseUrlDonhang = environment.apiUrl + 'donhang/';
    baseUrlacount = environment.apiUrl + 'acount/';
    baseUrlLoai = environment.apiUrl + 'loai/';
    baseUrlProduct = environment.apiUrl + 'product/';
    getHttpHeaders() {


        // console.log('auth.token',auth.access_token)
        let result = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return result;
    }

    UpdateTTDonHang(IdDonHang, key) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlDonhang + `UpdateTTDonHang?IdDonHang=${IdDonHang}&key=${key}`, null, { headers: httpHeader });
    }
    RemoveACount(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlacount + `RemoveACount?account_id=${acount_id}`, null, { headers: httpHeader });
    }
    UpdateRoles(acount_id, valueupdate) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlacount + `UpdateRoles?account_id=${acount_id}&valueupdate=${valueupdate}`, null, { headers: httpHeader });
    }
    RemoveLoai(category_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `RemoveLoai?category_id=${category_id}`, null, { headers: httpHeader });
    }

    Addloai(item) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `AddCateGory`, item, { headers: httpHeader });
    }
    UpdateCategory(item, category_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `UpdateCategory?category_id=${category_id}`, item, { headers: httpHeader });
    }
    UpdateProduct(item, product_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlProduct + `UpdateProduct?product_id=${product_id}`, item, { headers: httpHeader });
    }

    GetCategory() {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlLoai + `GetCategory`, { headers: httpHeader });
    }
    GetDoanhthu(key) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `DoanhThu?key=${key}`, { headers: httpHeader });
    }

    BieuDoDoanhThu() {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `BieuDoDoanhThu`, { headers: httpHeader });
    }



    SendGmail(title, body, gmail) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlacount + `SendGmail?title=${title}&body=${body}&emaireciver=${gmail}`, { headers: httpHeader });
    }

    AddProduct(item) {
        // const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlProduct + `AddProduct`, item, {});
    }

}
