import { Injectable } from '@angular/core'; import 'firebase/compat/app'
import { Retos } from '../models/retos';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable()
export class RetoService {

  myArray: Retos[] = []

  constructor(
    public router: Router,
    private db: AngularFirestore,
  ) { }

  retos: Retos[] = [];

  registerAreas(categoria: string, pregunta: string) {
    let area = { id: `uid${btoa(categoria)}`, categoria: categoria, pregunta: pregunta }
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('retos')
        .add(area)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
      // this.authFire.createUserWithEmailAndPassword(email, password)
    });
  }

  getByIdUser(id: string): Observable<any> {
    return this.db.collection('retos').doc(id).snapshotChanges();
  }

  getRetos(): Observable<any> {
    return this.db.collection('retos', ref => ref.orderBy('id', 'asc')).snapshotChanges();
  }

  async deleteUsuario(id: string): Promise<any> {
    this.db.collection('retos', (ref) =>
      ref.where('id', '==', id)
    ).get().forEach(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Usuario eliminado con exito");
        }).catch(function () {
          console.error("Error al eliminar el usuario");
        });
      });
    })
      .catch(function () {
        console.log("Error al eliminar el usuario");
      });
  }

  getByCategoria(categoria: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection('retos', (ref) =>
        ref.where('categoria', '==', categoria)
      )
        .valueChanges({ idField: 'id' })
        .subscribe((rp) => {
          if (rp[0]?.id) {
            resolve(rp);
          } else {
            resolve(rp);
          }
        });
    });
  }
}