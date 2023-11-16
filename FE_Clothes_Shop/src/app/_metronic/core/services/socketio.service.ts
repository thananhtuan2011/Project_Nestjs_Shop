import { AuthService } from './../../../modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SocketioService {
  socket: any
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  connect() {
    // const auth = this.auth.getAccessToken_cookie();
    this.socket = io(environment.HOST_SOCKET + '/notify', {
      transportOptions: {
        polling: {
          withCredentials: true,
          extraHeaders: {
            "my-custom-header": "abcd"
          }
        }
      }
    });
    this.socket.on('reconnect_attempt', () => {
      console.log('reconnect_attempt')
      // const auth = this.auth.getAccessToken_cookie();
      // this.socket.io.opts.transportOptions.polling.extraHeaders["x-auth-token"] = `${auth ?? ''}`
      this.socket.io.opts.transports = ['polling', 'websocket'];
    });
    this.socket.on('connect', (data) => {
      console.log('connect thành công')
    });

    this.socket.on('disconnect', (data) => {
      if (data === 'io server disconnect') {
        // const auth = this.auth.getAccessToken_cookie();
        // this.socket.io.opts.transportOptions.polling.extraHeaders["x-auth-token"] = `${auth ?? ''}`
        this.socket.connect();
      }
    });

  }


  // ReadAll(): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth != null ? auth.access_token : ''}`,
  //   });
  //   let item = { };
  //   return this.http.post<any>(environment.HOST_NOTIFICATION + `/notification/readall`, item, { headers: httpHeader });
  // }
  listen() {
    return new Observable((subscriber) => {
      this.socket.on('notification', (data) => {
        console.log("Received message from Websocket Server", data)
        subscriber.next(data)
      })
    })
  }

  // getNotificationList(isRead: any): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth!=null ? auth.access_token : ''}`,
  //   });
  //   const httpParam = new HttpParams().set('status', isRead)
  //   return this.http.get<any>(environment.HOST_NOTIFICATION+'/notification/pull', {
  // 		headers: httpHeader,
  // 		params: httpParam
  // 	});
  // }
  // getNewNotificationList(id: number): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth != null ? auth.access_token : ''}`,
  //   });
  //   return this.http.get<any>(environment.HOST_NOTIFICATION + '/notification/pull?status=item&id='+id, {
  //     headers: httpHeader,
  //   });
  // }
  // readNewNotification(id: number): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth!=null ? auth.access_token : ''}`,
  //   });
  //   let item = {
  //     "appCode": "TICKET",
  //     "mainMenuID": 20,
  //     "itemID":  id
  //   }
  // 	return this.http.post<any>(environment.HOST_NOTIFICATION+'/notification/readnew', item, { headers: httpHeader });
  // }
  // readNotification(id: string): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth!=null ? auth.access_token : ''}`,
  //   });
  //   let item = {
  //     "id":  id
  //   }
  // 	return this.http.post<any>(environment.HOST_NOTIFICATION+'/notification/read', item, { headers: httpHeader });
  // }

  // ReadAllNew(): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth != null ? auth.access_token : ''}`,
  //   });
  //   let item = { };
  //   return this.http.post<any>(environment.HOST_NOTIFICATION + `/notification/readallnew`, item, { headers: httpHeader });
  // }
  // getListApp(): Observable<any> {
  // 	const auth = this.auth.getAuthFromLocalStorage();
  // 	const httpHeader = new HttpHeaders({
  // 	  Authorization: `Bearer ${auth!=null ? auth.access_token : ''}`,
  // 	});
  // 	const httpParam = new HttpParams().set('userID', this.auth.getUserId())
  // 	return this.http.get<any>(environment.HOST_JEEACCOUNT_API+'/api/accountmanagement/GetListAppByUserID', {
  // 			headers: httpHeader,
  // 			params: httpParam
  // 		});
  // }

  // readNotification_menu(item): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth!=null ? auth.access_token : ''}`,
  //   });
  // 	return this.http.post<any>(environment.HOST_NOTIFICATION+'/notification/readnew', item, { headers: httpHeader });
  // }

  // getNewNotiSupport(): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth != null ? auth.access_token : ''}`,
  //   });
  //   return this.http.get<any>(environment.HOST_NOTIFICATION + '/notification/pull?status=mainmenu&id=11', {
  //     headers: httpHeader,
  //   });
  // }

  // getNewNotiMenuLeft(): Observable<any> {
  //   const auth = this.auth.getAuthFromLocalStorage();
  //   const httpHeader = new HttpHeaders({
  //     Authorization: `${auth != null ? auth.access_token : ''}`,
  //   });
  //   return this.http.get<any>(environment.HOST_NOTIFICATION + '/notification/pull?status=mainmenu', {
  //     headers: httpHeader,
  //   });
  // }
}