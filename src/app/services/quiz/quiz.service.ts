import { Injectable } from '@angular/core';
import * as parse from 'parse';
import { PersonnesService } from '../personnes/personnes.service';
import { StatistiqueService } from '../../services/statistique/statistique.service';
import { SuspectService } from '../suspect/suspect.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private persoSv: PersonnesService, private statistiqueSv: StatistiqueService, private suspectSv: SuspectService) { }

  async add(data: {
    casSuspect: boolean,
    formulaire: {
      name: string,
      age: any,
      contact: string,
      profession: string,
      commune: string
    },
    quiz: any
  }) {
    const quiz = parse.Object.extend('quiz');
    const query = new quiz();

    const perso = await this.persoSv.inscription(data.formulaire);
    if (data.casSuspect) {
      const suspect = await this.suspectSv.add(
        {
          commune: data.formulaire.commune,
          iDpersonnes: perso
        }
      );
      if (suspect.id) {
        const stat = await this.statistiqueSv.find(data.formulaire.commune);
        console.log('stat', stat);
      }
    }
    data.quiz.forEach(element => {
      query.set('id_quiz' + element.id_question, element.reponse);
    });
    query.set('Idpersonne', perso);
    query.set('casSuspect', data.casSuspect);
    return query.save();
    

  }

}
