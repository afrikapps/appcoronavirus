import { Component, OnInit, ViewChild } from '@angular/core';
import { QUIZ } from '../constants/quiz';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {

  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  questions = QUIZ;
  reponse = [];
  reponses = [];
  toutRepondre = false;

  constructor(private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this. questions = QUIZ;
  }

  suivant(
    id_question: any,
    reponse: any
  ) {
    console.log('reponse', this.reponse);
    if (id_question && (reponse === true || reponse === false)) {
      this.reponses.push({
        id_question,
        reponse
      });
      this.next();
      //console.log(this.reponses);
    }
    // this.reponse = '';
  }

  async valider(
    id_question: any,
    reponse: any,
    reponses: [{
      id_question?: number,
      reponse?: boolean
    }]
  ) {
    if (id_question && (reponse === true || reponse === false)) {
      this.reponses.push({
        id_question,
        reponse
      });
    }

    let appelUrgent = false;
    reponses.forEach(element => {
      if (element.reponse) {
        appelUrgent = true;
      }
    });

    const loading = await this.loadingController.create({
      message: 'CHARGEMENT...',
    });
    await loading.present();
    const formulaire = JSON.parse(localStorage.getItem('formulaire'));
    if (!localStorage.getItem('historique')) {
      localStorage.setItem('historique', JSON.stringify([{
        formulaire,
        reponses,
        appelUrgent
      }]));
    } else {
      let historique: any = JSON.parse(localStorage.getItem('historique'));
      console.log(historique)
      historique.push({
        formulaire,
        reponses,
        appelUrgent
      });
      localStorage.setItem('historique', JSON.stringify(historique));
    }

    console.log('terminer', reponses);
    setTimeout(async () => {
      loading.dismiss();
      this.reponse = [];
      this.reponses = [];
      this.slides.slideTo(0);
      // this.questions = []
      this.router.navigateByUrl('/home');
    }, 3000);
    
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
