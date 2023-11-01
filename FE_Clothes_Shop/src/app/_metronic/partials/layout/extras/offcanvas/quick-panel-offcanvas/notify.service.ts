import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// const connection = new signalR.HubConnectionBuilder()
//   .withUrl(environment.hubUrl+'presence', {
//     skipNegotiation: true,
//     transport: signalR.HttpTransportType.WebSockets
//   })
//       .build()

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    hubUrl = environment.hubUrl + '/hubs';
    private hubConnection: HubConnection;
    private onlineUsersSource = new BehaviorSubject<any[]>([]);
    onlineUsers$ = this.onlineUsersSource.asObservable();
    baseUrlorder = environment.apiUrl + 'order/';
    baseUrlDonhang = environment.apiUrl + 'donhang/';
    public thanhtoan = new Subject<any>();
    public xacnhan = new Subject<any>();
    public reload = new Subject<any>();
    public getInforDetailCart = new Subject<any>();
    public messagescall$ = new BehaviorSubject<any>(undefined);
    public CallOrther$ = new BehaviorSubject<any>(undefined);
    private readonly NewReactionMess = new BehaviorSubject<any>(
        false
    );

    // store checkk conect đang kết nối ở preseen 
    private readonly StoreCheckConnect = new BehaviorSubject<any>(
        false
    );
    readonly StoreCheckConnect$ = this.StoreCheckConnect.asObservable();

    get data_StoreCheckConnec() {
        return this.StoreCheckConnect.getValue();
    }
    set data_StoreCheckConnec(val) {
        this.StoreCheckConnect.next(val);
    }


    readonly NewReactionMess$ = this.NewReactionMess.asObservable();

    get data_shareNewReactionMess() {
        return this.NewReactionMess.getValue();
    }
    set data_shareNewReactionMess(val) {
        this.NewReactionMess.next(val);
    }



    private _recordingTime = new Subject<string>();
    public NotifyDesktop = new BehaviorSubject<any>(undefined);
    NotifyDesktop$ = this.NotifyDesktop.asObservable();


    public ClosevideoMess = new BehaviorSubject<any>(undefined);
    ClosevideoMess$ = this.ClosevideoMess.asObservable();

    private offlineUsersSource = new BehaviorSubject<any>(null);
    offlineUsers$ = this.offlineUsersSource.asObservable();

    private NewGroupSource = new BehaviorSubject<any>(null);
    NewGroupSource$ = this.NewGroupSource.asObservable();

    // private OpenmessageUsernameSource = new ReplaySubject<any>(1);
    // OpenmessageUsername$ = this.OpenmessageUsernameSource.asObservable();
    public OpenmessageUsernameSource = new Subject<any>();
    constructor(private router: Router,
        private http: HttpClient
    ) {


    }

    getRecordedTime(): Observable<string> {
        return this._recordingTime.asObservable();
    }
    private toString(value) {
        let val = value;
        if (!value) {
            val = '00';
        }
        if (value < 10) {
            val = '0' + value;
        }
        return val;
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

    GetDonHangXacNhanByAcount(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `GetDonHangXacNhanByAcount?acount_id=${acount_id}`, { headers: httpHeader });
    }
    GetDonHangChoXacNhan(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `GetDonHangChoXacNhan?acount_id=${acount_id}`, { headers: httpHeader });
    }
    GetDonHangXacNhanByAcountDangVanChuyen(acount_id) {
        const httpHeader = this.getHttpHeaders();
        return this.http.get(this.baseUrlDonhang + `GetDonHangXacNhanByAcountDangVanChuyen?acount_id=${acount_id}`, { headers: httpHeader });
    }
    connectToken() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl + '/shop', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
                // accessTokenFactory: () => data.access_token
            }).withAutomaticReconnect()
            // .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection.start().catch(err => console.log("errr", err));
        this.hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 60 * 4;
        this.hubConnection.keepAliveIntervalInMilliseconds = 1000 * 60 * 60 * 2;


        this.hubConnection.onreconnected(() => {
            // nhận sự kiện khi reconnect thành công
            this.data_StoreCheckConnec = "onreconnected"

        })

        this.hubConnection.onclose((error) => {
            console.log("Ngắt kết nối ở pressen")


        });

        // const data=this.auth.getAuthFromLocalStorage();

        //    var _token =`Bearer ${data.access_token}`

        //    this.hubConnection.invoke("onConnectedTokenAsync",_token);

        this.hubConnection.on('UserIsOnline', (username: any) => {

            this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
                this.onlineUsersSource.next([...usernames, username])
                // console.log('UserIsOnline',this.onlineUsers$)

            })
            // this.toastr.info(username.FullName+' has connect')
            // this.toastr.info(username.displayName+ ' has connect')
        })

        this.hubConnection.on('UserIsOffline', (User: any) => {
            this.onlineUsers$.pipe(take(1)).subscribe(usernames => {

                this.onlineUsersSource.next(usernames.filter(x => x.Username != User.Username))
                this.offlineUsersSource.next(User);
                // this.onlineUsersSource.next([...usernames, User])

                // console.log('UserIsOffline',this.onlineUsers$)
            })
        })
        this.hubConnection.on('ThanhToanMess', (item: any) => {
            console.log("Thanh toán", item)
            this.thanhtoan.next(item);
        })

        this.hubConnection.on('XacNhanMess', data => {
            this.xacnhan.next(data)
        })
        this.hubConnection.on('Call', data => {
            this.messagescall$.next(data)
        })
        this.hubConnection.on('CloseCallVideoMesage', data => {
            // console.log('Composing',data)
            this.ClosevideoMess.next(data);
        })
        this.hubConnection.on('NotifyDeskTop', data => {
            // console.log('Composing',data)
            this.NotifyDesktop.next(data);
        })
        this.hubConnection.on('NewGroupChatReceived', data => {
            // console.log('NewGroupChatReceived',data)
            this.NewGroupSource.next(data);
        })
        this.hubConnection.on('NewMessageReceived', (res: any) => {
            this.OpenmessageUsernameSource.next(res)
        })
        this.hubConnection.on('NewReactionMessage', (res: any) => {
            this.data_shareNewReactionMess = res
        })






    }

    CheckconnectPress() {
        // console.log("this.hubConnection.state preesen",this.hubConnection.state)
        if (this.hubConnection.state == 'Disconnected') {
            return false
        }
        else {
            return true;
        }
    }
    async sendThanhToan(item: any) {
        return this.hubConnection.invoke('ThanhToan', item)
            .catch(error => console.log(error));
    }

    async XacNhanDon(acount_id: any) {
        return this.hubConnection.invoke('XacNhanDon', acount_id)
            .catch(error => console.log(error));
    }



    async CheckConnect(token: string) {
        return this.hubConnection.invoke('CheckConnect', token)

    }

    async sendMessage(type: any, data: any, usernameoffer: string) {
        return this.hubConnection.invoke('OfferCall', type, JSON.stringify(data), usernameoffer)
            .catch(error => console.log(error));
    }




    stopHubConnection() {
        if (this.hubConnection) {
            this.hubConnection.stop().catch(error => console.log(error));

        }
    }





}
