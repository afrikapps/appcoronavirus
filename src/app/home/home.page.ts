import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormulaireComponent } from '../components/formulaire/formulaire.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: FormulaireComponent
    });
    return await modal.present();
  }

}
