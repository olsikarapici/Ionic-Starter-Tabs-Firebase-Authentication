import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async confirm(message: string, title: string = "Confirmation", rejectButtonLabel: string = "No", confirmButtonLabel: string = "Yes"): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: rejectButtonLabel,
          handler: () => resolveFunction(false)
        },
        {
          text: confirmButtonLabel,
          handler: () => resolveFunction(true)
        }
      ]
    });
    await alert.present();
    return promise;
  }

  async alert(message: string, title: string = "Alert", subTitle: string = null, closeButtonLabel: string = "OK"): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: closeButtonLabel,
          handler: () => resolveFunction(true)
        }
      ]
    });
    await alert.present();
    return promise;
  }



  async simpleToast(message: string, durationMs: number = 2000, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: durationMs,
      position: position
    });
    toast.present();
  }

}
