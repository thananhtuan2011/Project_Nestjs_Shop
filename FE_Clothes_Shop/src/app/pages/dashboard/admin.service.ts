import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    public Bieudo = new Subject<any>();
    constructor(private router: Router, private http: HttpClient, private cookie: CookieService) { }
    baseUrlDonhang = environment.apiUrl + 'donhang/';
    baseUrlacount = environment.apiUrl + 'login/';
    baseUrlLoai = environment.apiUrl + 'loai/';
    baseUrlProduct = environment.apiUrl + 'product/';
    getHttpHeaders() {


        let result = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${this.cookie.get("accessToken")}`,
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return result;
    }
    getHttpHeaderFiles() {

        let result = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        return result;
    }
    removeDonHang(_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlDonhang + "RemoveDonHang/" + _id, null, { headers: httpHeader });
    }
    AddFile(formData: FormData) {
        const httpHeader = this.getHttpHeaderFiles();
        return this.http.post("http://localhost:3000/file/single", formData, { headers: httpHeader });
    }
    UpdateTTDonHang(IdDonHang, key) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlDonhang + `UpdateTTDonHang/${IdDonHang}/${key}`, null, { headers: httpHeader });
    }
    RemoveACount(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlacount + `RemoveACount/${acount_id}`, null, { headers: httpHeader });
    }
    UpdateRoles(acount_id, valueupdate) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlacount + `UpdateRoles?account_id=${acount_id}&valueupdate=${valueupdate}`, null, { headers: httpHeader });
    }
    RemoveLoai(category_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `RemoveLoai/${category_id}`, null, { headers: httpHeader });
    }

    Addloai(item) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `AddCateGory`, item, { headers: httpHeader });
    }
    UpdateCategory(item) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlLoai + `UpdateCategory`, item, { headers: httpHeader });
    }
    UpdateProduct(item) {
        const httpHeader = this.getHttpHeaders();
        return this.http.post(this.baseUrlProduct + `UpdateProduct`, item, { headers: httpHeader });
    }

    GetCategory() {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlLoai + `GetDSLoai`, { headers: httpHeader });
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
