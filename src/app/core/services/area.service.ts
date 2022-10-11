import { Injectable } from '@angular/core'
import 'firebase/compat/app'
import { Areas } from '../models/areas';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AreaService {

  myArray: any[] = []

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth,
  ) { }

  areas: Areas[] = [];

  registerAreas(categoria: string, texto: string) {
    let area = { id: `uid${btoa(categoria)}`, categoria: categoria, texto: texto }
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('areas')
        .add(area)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
      // this.authFire.createUserWithEmailAndPassword(email, password)
    });
  }

  getByIdUser(id: string): Observable<any> {
    return this.db.collection('areas').doc(id).snapshotChanges();
  }

  getAreas(): Observable<any> {
    return this.db.collection('areas', ref => ref.orderBy('id', 'asc')).snapshotChanges();
  }

  async deleteUsuario(id: string): Promise<any> {
    this.db.collection('areas', (ref) =>
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
}