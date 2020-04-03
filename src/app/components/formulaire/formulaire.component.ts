import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMUNES } from '../../constants/communes';
import { PersonnesService } from '../../services/personnes/personnes.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss'],
})
export class FormulaireComponent implements OnInit {

  inputId: any;

  communes = COMMUNES;

  formulaire: FormGroup;

  constructor(private modalCtrl: ModalController, private router: Router,
              private formBuider: FormBuilder, private inscriptionSv: PersonnesService, private loadingController: LoadingController, ) {
    this.formulaire = this.formBuider.group({
      nomcomplet : ['', [Validators.minLength(5), Validators.required]],
      age : ['', [Validators.required]],
      contact : ['', [Validators.minLength(8), Validators.required]],
      profession : ['', [Validators.minLength(3), Validators.required]],
      commune : ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss('cancel');
  }

  async openPageTest(data: any) {
    console.log(data);
    localStorage.setItem('formulaire', JSON.stringify(data));
    this.dismiss();
    this.router.navigateByUrl('/tests');
    /*const loading = await this.loadingController.create({
      message: 'CHARGEMENT...',
    });
    await loading.present();
    try {
      const reponse = await this.inscriptionSv.inscription(data);
      localStorage.setItem('formulaire', JSON.stringify(data));
      loading.dismiss(reponse);
      this.dismiss();
      this.router.navigateByUrl('/tests');
    } catch (error) {
      loading.dismiss(error);
      this.dismiss();
    }*/

  }

}
