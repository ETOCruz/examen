import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(private modalCtrl: ModalController) { }

  async show() {
    if (!this.isLoading.getValue()) {
      const modal = await this.modalCtrl.create({
        component: LoaderComponent,
        cssClass: 'full-screen-loader',
        backdropDismiss: false
      });
      await modal.present()
        .finally(() => {
          this.isLoading.next(true);
        });
      return
    }
  }

  async hide() {
    if (this.isLoading.getValue()) {
      await this.modalCtrl.dismiss()
        .finally(() => {
          this.isLoading.next(false);
        });
      return;
    }
  }

}
