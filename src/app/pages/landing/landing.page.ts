import { LoadingService } from './../../services/loading.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private router: Router,
    private alert: AlertService,
    private loadingService: LoadingService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  continueAsGuest() {
    this.loadingService.present();
    this.auth.signInAnonymously().then((data) => {
      if (this.loadingService.isLoading) {
        this.loadingService.dismiss()
      }
      console.log('sign in ok anonymously');
      console.log(data);
      this.router.navigate(['/home']);

    }, (err) => {

      if (this.loadingService.isLoading) {
        this.loadingService.dismiss()
      }
      console.log(err);

    });
  }

  register() {
    // this.toast.customMessage("TODO");
    this.router.navigate(['/register']);
  }

  login() {
    // this.toast.customMessage("TODO");
    this.router.navigate(['/login']);
  }

  facebookLogin() {
    console.log('fb login');
    this.alert.simpleToast("To be implemented");
    // this.router.navigate(['/home']);
  }

  ionViewWillEnter() {
    this.loadingService.present();
    this.auth.user$.subscribe(
      result => {
        if (this.loadingService.isLoading)
          this.loadingService.dismiss();
        if (result && result.email) {
          this.router.navigate(['/home']);
        } else {
          if (this.loadingService.isLoading)
            this.loadingService.dismiss();
        }
      },
      error => {
        console.log("EE:", error);
      }
    )
  }


}
