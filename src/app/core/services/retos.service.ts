import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Retos } from '../models/retos';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Opciones } from '../models/opciones';

@Injectable()
export class RetoService {
  constructor(public router: Router, private db: AngularFirestore) {}

  retos: Retos[] = [];

  registerRetos(formularioall) {
    formularioall = {
      id: `uid${btoa(formularioall.categoria)}`,
      categoria: formularioall.categoria,
      pregunta: formularioall.pregunta,
      imageUrl: formularioall.imageUrl,
      opciones: {
        opcion1: formularioall.opcion1,
        opcion2: formularioall.opcion2,
        opcion3: formularioall.opcion3,
      },
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

  getByOpciones(categoria: string): Observable<any> {
    return this.db
      .collection('retos', (ref) => ref.where('categoria', '==', categoria))
      .snapshotChanges()
      .pipe(
        map((opciones) => {
          return opciones.map((opciones) => {
            let data = opciones.payload.doc.data() as Opciones; //here solutions
            return {
              // id: opciones.payload.doc.id,
              ...data,
            };
          });
        })
      );
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
}
