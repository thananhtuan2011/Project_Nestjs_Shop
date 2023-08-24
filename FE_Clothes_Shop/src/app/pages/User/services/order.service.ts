import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private router: Router, private http: HttpClient) { }
  baseUrlorder = environment.apiUrl + 'order/';
  baseUrlAcount = environment.apiUrl + 'acount/';
  baseUrlDonhang = environment.apiUrl + 'donhang/';
  getHttpHeaders() {


    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  InsertOrder(item, acount_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `AddOrder?acount_id=${acount_id}`, item, { headers: httpHeader });
  }
  UpdateLuotMua(product_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `UpdateLuotMua?produtct_id=${product_id}`, null, { headers: httpHeader });
  }

  SendGmail(title, body, gmail) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `SendGmail?title=${title}&body=${body}&emaireciver=${gmail}`, { headers: httpHeader });
  }

  GetDonHangAcountDetail(acount_id, iddonhang) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlDonhang + `GetDonHangAcountDetail?acount_id=${acount_id}&iddonhang=${iddonhang}`, { headers: httpHeader });
  }
  GetDonHangXacNhanByAcountDetail(acount_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlDonhang + `GetDonHangXacNhanByAcountDetail?acount_id=${acount_id}`, { headers: httpHeader });
  }
  InsertDonHang(item, acount_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `AddDonHang?acount_id=${acount_id}`, item, { headers: httpHeader });
  }
  EditDonHang(item, IdDonHang) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `EditDonHang?IdDonHang=${IdDonHang}`, item, { headers: httpHeader });
  }
  RemoveOrder(order_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlDonhang + `RemoveOrder?orderid=${order_id}`, null, { headers: httpHeader });
  }

  RemoveSpOrder(order_id) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `RemoveSpOrder?orderid=${order_id}`, null, { headers: httpHeader });
  }
  UpdateSpOrder(order_id, color, sl, Size) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlorder + `UpdateSpOrder?orderid=${order_id}&color=${color}&sl=${sl}&Size=${Size}`, null, { headers: httpHeader });
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
