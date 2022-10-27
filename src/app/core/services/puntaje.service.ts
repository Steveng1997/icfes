import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Puntaje } from '../models/Puntaje';

@Injectable()
export class PuntuacionService {
  constructor(public router: Router, private db: AngularFirestore) { }

  puntaje: Puntaje[] = [];
  cursoDoc: AngularFirestoreDocument<Puntaje>;

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------
  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  registerPuntacion(puntuacion: number) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: 'idUsuario',
      puntuacion: puntuacion,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('puntaje')
        .add(puntua)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  registerByIdUsuario(id) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
      puntuacion: 0,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('puntaje')
        .add(puntua)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  registerByIdUsuarioAll(id) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('puntaje')
        .add(puntua)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  // -----------------------------------------------------------------------------------
  // End register
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  getById(id) {
    return this.db
      .collection('puntaje', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }

  getByIdUsuario(id) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', id))
      .valueChanges();
  }

  getPuntaje(): Observable<any> {
    return this.db
      .collection('puntaje', (ref) => ref.orderBy('id', 'asc'))
      .snapshotChanges();
  }

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updatePuntuacion(punt: Puntaje) {
    return this.db
      .collection('puntaje', (ref) => ref.where('id', '==', punt.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(punt);
        });
      });
  }

  updatePuntaje(id: string, puntuacion: number) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            puntuacion: puntuacion,
          });
        });
      });
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deletePuntaje(id: string): Promise<any> {
    this.db
      .collection('puntaje', (ref) => ref.where('id', '==', id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log('El puntaje fue eliminado con exito');
            })
            .catch(function () {
              console.error('Error al eliminar una puntuacion');
            });
        });
      })
      .catch(function () {
        console.log('Error al eliminar el puntaje');
      });
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
