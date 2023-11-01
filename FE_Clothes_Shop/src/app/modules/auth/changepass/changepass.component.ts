import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { AcountModel } from '../_models/acount.model';
import { LayoutUtilsService, MessageType } from '../crud/utils/layout-utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  maxacnhan: number;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ChangepassComponent>,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    console.log("tttt", this.data)
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {

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
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
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
    // this.hasError = false;
    // const result = {};
    // Object.keys(this.f).forEach(key => {
    //   result[key] = this.f[key].value;
    // });
    // const newUser = this.ItemNewUser()
    // const registrationSubscr = this.authService.CreateUser(newUser).subscribe((res: any) => {
    //   if (res && res.status == 1) {
    //     this.layoutUtilsService.showActionNotification("Thành Công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
    //     setTimeout(() => {
    //       this.login(res.data.user_name, res.data.password)
    //     }, 500);


    //   }
    //   else {
    //     this.layoutUtilsService.showActionNotification("Tài khoản đã tồn tài", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    //   }
    // })

    this.authService.ChangePass(this.data.username, this.registrationForm.controls["password"].value, this.maxacnhan).subscribe((res: any) => {
      if (res && res.status == 1) {
        this.layoutUtilsService.showActionNotification("Lấy lại mật khẩu thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.dialogRef.close();
      }
      else {
        this.layoutUtilsService.showActionNotification("Mã xác nhận không chính xác", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
