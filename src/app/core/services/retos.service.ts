import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Retos } from '../models/retos';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable()
export class RetoService {
  constructor(public router: Router, private db: AngularFirestore) {}

  retos: Retos[] = [];
  cursoDoc: AngularFirestoreDocument<Retos>;

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
  registerRetos(formularioall) {
    formularioall = {
      id: `uid${this.makeid(10)}`,
      categoria: formularioall.categoria,
      pregunta: formularioall.pregunta,
      imageUrl: formularioall.imageUrl,
      opciones: {
        opcion1: formularioall.opcion1,
        opcion2: formularioall.opcion2,
        opcion3: formularioall.opcion3,
        opcion4: formularioall.opcion4,
      },
      respuesta: formularioall.respuesta,
      respondido: false,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('retos')
        .add(formularioall)
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
      .collection('retos', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }

  getRetos(): Observable<any> {
    return this.db
      .collection('retos', (ref) => ref.orderBy('id', 'asc'))
      .snapshotChanges();
  }

  getRetosByCategoria(): Observable<any> {
    return this.db
      .collection('retos', (ref) => ref.orderBy('categoria', 'asc'))
      .snapshotChanges();
  }

  getByCategoria(categoria: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) =>
          ref
            .where('categoria', '==', categoria)
            .where('respondido', '==', false)
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

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateRetos(reto: Retos) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(reto);
        });
      });
  }

  updateOpciones() {
    return this.db
      .collection('retos')
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            respondido: true,
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

  async deleteUsuario(id: string): Promise<any> {
    this.db
      .collection('retos', (ref) => ref.where('id', '==', id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log('Usuario eliminado con exito');
            })
            .catch(function () {
              console.error('Error al eliminar el usuario');
            });
        });
      })
      .catch(function () {
        console.log('Error al eliminar el usuario');
      });
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
