import { Injectable } from '@angular/core';
import * as parse from 'parse';
import { SuspectService } from '../suspect/suspect.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private suspectSv: SuspectService) { }

  async find(commune: string) {

    const Statistique = parse.Object.extend('Statistique');
    const query = new parse.Query(Statistique);
    query.equalTo('nom_commune', commune);
    return query.first().then(
      async (x) => {
        if (x) {
          console.log('trouer', x.toJSON());
          const reponse = x.toJSON();
          this.update({
            objectId: reponse.objectId,
            commune
          });
          return x.toJSON();
        } else {
          console.log('non definie', x);
          const objectId = await this.add(commune);
          if (objectId) {
            this.update(
              {
                objectId,
                commune
              }
            );
          }
        }
      }
    );


  }

  async update(data: {objectId: string, commune: string}) {
    const Statistique = parse.Object.extend('Statistique');
    const query = new parse.Query(Statistique);

    const nombre = await this.suspectSv.counter(data.commune);
    console.log('data.commune', nombre)
    query.get(data.objectId).then(
      x => {
        x.set('nombre', nombre);
        x.save();
      }
      );
  }

  async add(commune) {
    const Statistique = parse.Object.extend('Statistique');
    const query = new Statistique();
    query.set('nom_commune', commune);
    const reponse = await query.save();
    return reponse.id;
  }


  async read() {
    const Statistique = parse.Object.extend('Statistique');
    const query = new parse.Query(Statistique);
    const reponse = await query.find();
    return reponse.map(x =>  x.toJSON() );
  }

}
