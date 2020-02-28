import { LoadingService } from './../../../services/loading.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { User } from './../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public error: string;
  user: User;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private auth: AuthenticationService,
    private alert: AlertService
  ) {
    this.error = '';
    this.user = {};
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }


  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  ionViewWillEnter() {
    this.error = '';
  }

  login(loginFormData) {
    this.error = '';
    this.loadingService.present();

    this.auth.signIn(loginFormData.email, loginFormData.password).then((data) => {
      console.log('sign in ok return then promise');
      console.log(data);
      if (data.user.emailVerified) {
        this.router.navigate(["home"]).then(() => {
          if (this.loadingService.isLoading)
            this.loadingService.dismiss();
        })
      }
      else {
        if (this.loadingService.isLoading)
          this.loadingService.dismiss();
        this.alert.simpleToast('Your account is not verified. Please check your email for verification', 3000, "middle")
      }

    }, (err) => {

      if (this.loadingService.isLoading) {
        this.loadingService.dismiss()
      }

      console.log('error: ', err);
      this.error = '';
      this.error = err.message;

    });
  }

  ngOnInit() {
  }
}
