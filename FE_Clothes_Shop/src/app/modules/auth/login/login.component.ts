import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from '../crud/utils/layout-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  remmber: boolean = false
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  UserRemember: any;
  constructor(
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.UserRemember = (JSON.parse(localStorage.getItem('UserRemember')))
    console.log("ttt", this.UserRemember)
    if (this.UserRemember) {
      this.remmber = true;
    }
    else {
      this.remmber = false
    }

  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.UserRemember ? this.UserRemember[0].username : '',
        Validators.compose([
          Validators.required,

        ]),
      ],
      password: [
        this.UserRemember ? this.UserRemember[0].pass : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  checkCheckBoxvalue(event) {
    console.log(event.checked)
    this.remmber = event.checked;
  }
  submit() {
    console.log("his.remmber", this.remmber)
    if (this.remmber == true) {
      let itemremember = [{
        username: this.f.username.value,
        pass: this.f.password.value

      }]
      localStorage.setItem("UserRemember", JSON.stringify(itemremember));
    }
    else {
      localStorage.removeItem("UserRemember");
    }
    this.hasError = false;
    const loginSubscr = this.authService
      .loginAcount(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: any) => {
        if (user && user.data.length > 0) {
          localStorage.setItem("User", JSON.stringify(user.data));
          if (user.data[0].role_code != '1') {
            this.router.navigate(['/Home']);
          }
          else {
            this.router.navigate(['/dashboard']);

          }



        } else {
          this.hasError = true;
          this.layoutUtilsService.showActionNotification("Tài khoản không chính xác", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
