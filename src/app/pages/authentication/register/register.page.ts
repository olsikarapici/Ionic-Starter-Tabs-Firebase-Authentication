import { User } from './../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public error: string;
  newUser: User;
  constructor(
    private router: Router,
    private alert: AlertService,
    private loadingService: LoadingService,
    private auth: AuthenticationService
  ) {
    this.error = '';
    this.newUser = {};
  }

  ionViewWillEnter() {
    this.error = '';
    this.newUser = {};
  }

  ngOnInit() {
  }

  goToLogin() {
    // this.toast.customMessage("TODO");
    this.router.navigate(['/login']);
  }

  register(registerFormData) {
    this.error = '';
    console.log(registerFormData);
    this.loadingService.present();
    this.newUser.firstName = registerFormData.firstName;
    this.newUser.lastName = registerFormData.lastName;
    this.newUser.email = registerFormData.email;
    this.newUser.password = registerFormData.password;
    this.auth.register(this.newUser).then(() => {
      if (this.loadingService.isLoading)
        this.loadingService.dismiss();
      this.alert.simpleToast("A verification email was sent to your account. It may even be in the Spam folder", 3000, "top");
      this.auth.signOut().then(() => {
        this.router.navigate(['/login'])
      });
    });


  }

}
