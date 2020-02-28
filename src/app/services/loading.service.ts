import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean = false;

  constructor(public loadingController: LoadingController) { }

  async present(spinner: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" = "bubbles", message: string = "Loading...") {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: spinner,
      message: message,
      duration: 20000
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
