import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ChangepassComponent } from '../changepass/changepass.component';
import { Router } from '@angular/router';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }
  Change() {
    let ma = Math.floor(Math.random() * 90000) + 10000;

    this.authService.SendGmail("Quên mật khẩu", 'Mã xác nhận của quý khách là : ' + ma, this.forgotPasswordForm.controls["email"].value).subscribe(res => {
      if (res) {
        this.authService.SaveKeyGmail(this.forgotPasswordForm.controls["username"].value, ma).subscribe((res: any) => {
          if (res) {

          }
        })
      }
    })

    const dialogRef = this.dialog.open(ChangepassComponent, {
      width: '500px',
      data: { username: this.forgotPasswordForm.controls["username"].value },
      //with:'500px',
      height: '600px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      this.router.navigate(['/auth/login'])
    })

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      username: [
        ''
        , Validators.compose([
          Validators.required,

        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }

  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe((result: boolean) => {
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }
}
