import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { AcountModel } from '../_models/acount.model';
import { LayoutUtilsService, MessageType } from '../crud/utils/layout-utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(11),
          ]),
        ],

        username: [
          '',
          Validators.compose([
            Validators.required,

          ]),
        ],
        address: [
          '',
          Validators.compose([
            Validators.required,

          ]),
        ],

        email: [
          '@gmail.com',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }
  ItemNewUser(): AcountModel {

    const item = new AcountModel();


    item.full_name = this.registrationForm.controls["fullname"].value;
    item.password = this.registrationForm.controls["password"].value;
    item.phone = this.registrationForm.controls["phone"].value.toString();
    item.email = this.registrationForm.controls["email"].value;
    item.address = this.registrationForm.controls["address"].value;
    item.user_name = this.registrationForm.controls["username"].value;

    return item
  }
  login(us, pass) {
    const loginSubscr = this.authService
      .loginAcount(us, pass)
      .pipe(first())
      .subscribe((user: any) => {
        if (user && user.data.length > 0) {
          localStorage.setItem("User", JSON.stringify(user.data));
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
          this.layoutUtilsService.showActionNotification("Tài khoản không chính xác", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  submit() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    const newUser = this.ItemNewUser()
    const registrationSubscr = this.authService.CreateUser(newUser).subscribe((res: any) => {
      if (res && res.status == 1) {
        this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        setTimeout(() => {
          this.login(res.data.user_name, res.data.password)
        }, 500);


      }
      else {
        this.layoutUtilsService.showActionNotification("Tài khoản đã tồn tài", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
      }
    })
    // const registrationSubscr = this.authService
    //   .registration(newUser)
    //   .pipe(first())
    //   .subscribe((user: UserModel) => {
    //     if (user) {
    //       this.router.navigate(['/']);
    //     } else {
    //       this.hasError = true;
    //     }
    // });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
