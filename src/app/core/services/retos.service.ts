import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Retos } from '../models/retos';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable()
export class RetoService {
  constructor(public router: Router, private db: AngularFirestore) {}

  retos: Retos[] = [];

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------

  registerRetos(formularioall) {
    formularioall = {
      id: `uid${btoa(formularioall.pregunta)}`,
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
        .collection('retos', (ref) => ref.where('categoria', '==', categoria))
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

  getByRespondido(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref.where('respondido', '==', false))
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
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateRetos(retos: Retos, id) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            categoria: retos.categoria,
            image: retos.imageUrl,

            opciones: {
              opcion1: retos.opcion1,
              opcion2: retos.opcion2,
              opcion3: retos.opcion3,
              opcion4: retos.opcion4,
            },

            pregunta: retos.pregunta,
            respuesta: retos.respuesta,
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
