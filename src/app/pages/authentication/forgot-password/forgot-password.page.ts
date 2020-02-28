import { LoadingService } from './../../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public error: string;
  constructor(
    private loadingService: LoadingService,
    private auth: AuthenticationService,
    private alert: AlertService,
    private router: Router
  ) {
    this.error = '';
  }

  ngOnInit() {
  }

  forgotPassword(forgotPasswordFormData) {
    this.error = '';
    console.log(forgotPasswordFormData);
    this.loadingService.present();
    this.auth.resetPassword(forgotPasswordFormData.email).then(() => {
      if (this.loadingService.isLoading)
        this.loadingService.dismiss();
      this.alert.simpleToast("Password reset link sent successfully to  " + forgotPasswordFormData.email, 3000, "middle");
      this.router.navigate(['/login']);
    }, err => {
      this.error = err;
      console.log(err);
    });


  }


}
