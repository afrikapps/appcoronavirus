import { Component, OnInit, ViewChild } from '@angular/core';
import { QUIZ } from '../constants/quiz';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  }

  suivant(
    id_question: any,
    reponse: any
  ) {
    console.log('reponse', this.reponse);
    if (id_question && reponse) {
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
    reponses: any
  ) {
    if (id_question && reponse) {
      this.reponses.push({
        id_question,
        reponse
      });
    }

    const loading = await this.loadingController.create({
      message: 'CHARGEMENT...',
    });
    await loading.present();
    console.log('terminer', reponses);
    setTimeout(async () => {
      loading.dismiss();
      this.reponse = [];
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
