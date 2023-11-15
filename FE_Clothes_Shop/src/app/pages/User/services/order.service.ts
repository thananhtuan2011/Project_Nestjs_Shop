import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) { }
  baseUrlorder = environment.apiUrl + 'order/';
  baseUrlAcount = environment.apiUrl + 'acount/';
  baseUrlDonhang = environment.apiUrl + 'donhang/';
  getHttpHeaders() {


    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${this.cookie.get("accessToken")}`,
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  InsertOrder(item) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `AddOrder`, item, { headers: httpHeader });
  }


  SendGmail(title, body, gmail) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `SendGmail?title=${title}&body=${body}&emaireciver=${gmail}`, { headers: httpHeader });
  }

  GetDonHangAcountDetail(iddonhang) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlDonhang + `GetDonHangAcountDetail/${iddonhang}`, { headers: httpHeader });
  }
  GetDonHangXacNhanByAcountDetail(acount_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlDonhang + `GetDonHangXacNhanByAcountDetail?acount_id=${acount_id}`, { headers: httpHeader });
  }
  InsertDonHang(item) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `AddDonHang`, item, { headers: httpHeader });
  }
  EditDonHang(item) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `EditDonHang?`, item, { headers: httpHeader });
  }
  RemoveOrder(order_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `RemoveOrder?orderid=${order_id}`, null, { headers: httpHeader });
  }

  RemoveSpOrder(order_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `RemoveSpOrder/${order_id}`, null, { headers: httpHeader });
  }
  UpdateSpOrder(item) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `UpdateSpOrder`, item, { headers: httpHeader });
  }

  SaveKeyGmail(IdDonHang, key) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `SaveKeyGmail?IdDonHang=${IdDonHang}&key=${key}`, null, { headers: httpHeader });
  }
  SubmitXacNhan(IdDonHang, key) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlDonhang + `SubmitXacNhan?IdDonHang=${IdDonHang}&key=${key}`, { headers: httpHeader });
  }



  RemoveOrderIteam(order_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `RemoveOrderIteam?orderid=${order_id}`, null, { headers: httpHeader });
  }

}
