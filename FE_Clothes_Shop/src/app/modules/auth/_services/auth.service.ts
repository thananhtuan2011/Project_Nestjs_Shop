import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  baseUrlAcount = environment.apiUrl + 'login/';

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http: HttpClient,
    private cookie_services: CookieService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
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
  loginAcount(usernameinput: string, passwordinput: string) {
    const httpHeader = this.getHttpHeaders();
    let item =
    {
      username: usernameinput,
      password: passwordinput
    }
    return this.http.post(this.baseUrlAcount + `Login`, item, { headers: httpHeader });
  }
  CreateUser(item: any) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `Register`, item, { headers: httpHeader });
  }
  // public methods
  // login(username: string, password: string): Observable<UserModel> {
  //   this.isLoadingSubject.next(true);
  //   this.loginAcount(username,password).subscribe((res:any)=>
  //     {
  //       console.log("")
  //       if(res)
  //       {
  //         localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res.data));
  //       }
  //     })

  //   return this.authHttpService.login(username, password).pipe(
  //     map((auth: AuthModel) => {
  //       const result = this.setAuthFromLocalStorage(auth);
  //       return result;
  //     }),
  //     switchMap(() => this.getUserByToken()),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  logout() {
    localStorage.removeItem("User");
    this.cookie_services.delete("accessToken")
    this.cookie_services.delete("refreshToken")
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }


  ChangePass(username, pass, keyxacnhan) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `ChangePass?username=${username}&pass=${pass}&keyxacnhan=${keyxacnhan}`, null, { headers: httpHeader });
  }
  SaveKeyGmail(username, key) {
    const httpHeader = this.getHttpHeaders();
    return this.http.post(this.baseUrlAcount + `SaveKeyGmail?username=${username}&key=${key}`, null, { headers: httpHeader });
  }
  SendGmail(title, body, gmail) {
    const httpHeader = this.getHttpHeaders();
    return this.http.get(this.baseUrlAcount + `SendGmail?title=${title}&body=${body}&emaireciver=${gmail}`, { headers: httpHeader });
  }


  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.loginAcount(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  Gettoken() {
    const accessToken = this.cookie_services.get("accessToken")
    return accessToken;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
