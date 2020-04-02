import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormulaireComponent } from '../components/formulaire/formulaire.component';
import { HistoriqueComponent } from '../components/historique/historique.component';
import { StatistiquesComponent } from '../components/statistiques/statistiques.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  async formulaire() {
    const modal = await this.modalController.create({
      component: FormulaireComponent
    });
    return await modal.present();
  }

  async historique() {
    const modal = await this.modalController.create({
      component: HistoriqueComponent
    });
    return await modal.present();
  }

  async statistique() {
    const modal = await this.modalController.create({
      component: StatistiquesComponent
    });
    return await modal.present();
  }

}
