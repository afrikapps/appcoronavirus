import { Component, OnInit, ViewChild } from '@angular/core';
import { QUIZ } from '../constants/quiz';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { PersonnesService } from '../services/personnes/personnes.service';
import { QuizService } from '../services/quiz/quiz.service';
import { StatistiqueService } from '../services/statistique/statistique.service';
import * as covid from 'covid19-data';
import { CallNumber } from '@ionic-native/call-number/ngx';

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

  messageTest = 'Vous ne faites pas partie des cas suspect';

  constructor(private loadingController: LoadingController, private router: Router, public alertController: AlertController,
              private callNumber: CallNumber,
              private persoSv: StatistiqueService, private quizSv: QuizService) { }

  async ngOnInit() {
    // console.log(await covid('Ivory Coast'))
    this. questions = QUIZ;
    // const formulaire = JSON.parse(localStorage.getItem('formulaire'));
    // console.log(await this.persoSv.increment( {commune: 'Abobo'}))
  }

  suivant(
    // tslint:disable-next-line:variable-name
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
      // console.log(this.reponses);
    }
    // this.reponse = '';
  }

  async valider(
    // tslint:disable-next-line:variable-name
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
    // tslint:disable-next-line:no-shadowed-variable
    reponses.forEach(element => {
      if (element.reponse) {
        appelUrgent = true;
        this.messageTest = 'Vous êtes un cas suspect, veuillez contacter le service d\'urgence';
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
      const historique: any = JSON.parse(localStorage.getItem('historique'));
      console.log(historique);
      historique.push({
        formulaire,
        reponses,
        appelUrgent
      });
      localStorage.setItem('historique', JSON.stringify(historique));
    }

    try {

      // tslint:disable-next-line:no-shadowed-variable
      const reponse = await this.quizSv.add({
        casSuspect: appelUrgent,
        formulaire,
        quiz: reponses
      });

      console.log('error1', reponse);
      this.reponse = [];
      this.reponses = [];
      loading.dismiss();
      this.presentAlertMultipleButtons();
      appelUrgent = false;
      this.messageTest = 'Vous ne faites pas partie des cas suspect';
      this.slides.slideTo(0);
      // this.router.navigateByUrl('/home');

    } catch (error) {
      // loading.dismiss(error);
      loading.dismiss();
      this.message('probleme de connexion internet');
      console.log('error', error);
    }

  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
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

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Resultat du test',
      message: this.messageTest,
      buttons: [
        {
          text: 'Retour',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Appeler',
          handler: () => {
           this.numeroVert();
          }
        }
      ]
    });

    await alert.present();
  }

  async numeroVert() {
    const alert = await this.alertController.create({
      header: 'Appelez l\'un des numéro suivant',
      buttons: [
        {
          text: '144',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.appeler('144');
          }
        }, {
          text: '143',
          handler: () => {
            this.appeler('143');
          }
        }, {
          text: '101',
          handler: () => {
            this.appeler('101');
          }
        }
      ]
    });

    await alert.present();
  }

  appeler(data) {
    this.callNumber.callNumber(data, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log(data, err));
  }

}
