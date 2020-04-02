import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { StatistiqueService } from '../../services/statistique/statistique.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
})
export class StatistiquesComponent implements OnInit {

  statistiques = []

  constructor(private modalCtrl: ModalController, public alertController: AlertController,
    private statistiqueSv: StatistiqueService, private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'CHARGEMENT...',
    });
    await loading.present();


    try {
      this.statistiques = await this.statistiqueSv.read();
      loading.dismiss(this.statistiques)
      console.log(this.statistiques)
    } catch (error) {
      loading.dismiss();
      this.message('Probleme de connexion internet')
    }
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss('cancel');
  }

  async message(message: string) {
    const alert = await this.alertController.create({
      header: 'Internet',
      // subHeader: 'Subtitle',
      backdropDismiss: false,
      message,
      buttons: ['ok']
    });

    await alert.present();
  }

}
