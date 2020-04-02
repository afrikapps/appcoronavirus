import { Injectable } from '@angular/core';
import * as parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class SuspectService {

  constructor() { }

  add(data: {commune: string, iDpersonnes: any}) {
    const Suspect = parse.Object.extend('Suspect');
    const query = new Suspect();

    query.set('nom_commune', data.commune);
    query.set('personnes', data.iDpersonnes);
    //query.increment('nombre');
    return query.save();
  }

  async counter(commune: string) {
    const Statistique = parse.Object.extend('Suspect');
    const query = new parse.Query(Statistique);

    query.equalTo('nom_commune', commune);
    const count = await query.count();
    return count;

  }

  increment(data: {
    commune: string
  }) {
    const personnes = parse.Object.extend('personnes');
    const query = new parse.Query(personnes);
    // here you put the objectId that you want to update
    query.get(data.commune).then(
      x => {
        x.increment('nombre');
        return x.save();
      }
    );
  }

}
