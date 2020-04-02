import { Injectable } from '@angular/core';
import * as parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class PersonnesService {

  constructor() { }

  async inscription(data: {
    name: string,
    age: any,
    contact: string,
    profession: string,
    commune: string
  }) {
    const personnes = parse.Object.extend('Personnes');
    const query = new personnes();

    query.set(data);
    return query.save();
  }

  update(objectId, data: {
    champ: string,
    value: any
  }) {

    const personnes = parse.Object.extend('personnes');
    const query = new parse.Query(personnes);
    // here you put the objectId that you want to update
    query.get(objectId).then(
      x => {
        x.set(data);
        return x.save();
      }
    );

  }

}
