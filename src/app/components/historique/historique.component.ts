import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
})
export class HistoriqueComponent implements OnInit {

  historique = [];

  constructor(private modalCtrl: ModalController, private callNumber: CallNumber) { }

  ngOnInit() {
    this.historique = JSON.parse(localStorage.getItem('historique'));
    console.log(this.historique);

  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss('cancel');
  }

  appel() {
    this.callNumber.callNumber('144', true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
