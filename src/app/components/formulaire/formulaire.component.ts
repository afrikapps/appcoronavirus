import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss'],
})
export class FormulaireComponent implements OnInit {

  inputId: any;

  formulaire: FormGroup;

  constructor(private modalCtrl: ModalController, private router: Router,
              private formBuider: FormBuilder,) {
    this.formulaire = this.formBuider.group({
      nomcomplet : ['', [Validators.minLength(5), Validators.required]],
      age : ['', [Validators.required]],
      contact : ['', [Validators.minLength(8), Validators.required]],
      profession : ['', [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss('cancel');
  }

  openPageTest(data: any) {
    console.log(data);
    localStorage.setItem('formulaire', JSON.stringify(data));
    this.dismiss();
    this.router.navigateByUrl('/tests');
  }

}
