import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertControllerService {

  constructor(
    private alertController: AlertController,
  ) { }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
