import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Desafio } from '../models/desafio';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable()
export class DesafioService {
  myArray: any[] = [];

  constructor(
    public router: Router,
    private db: AngularFirestore
  ) { }

  estudiantes: Desafio[] = [];

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------

  registerDesafio(nombre: string) {
    let desafios = { id: `uid${btoa(nombre)}`, nombre: nombre, idReto: '', categoria: '' };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('desafios')
        .add(desafios)
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

  getDesafioAll() {
    return this.db
      .collection('desafios', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges()
  }

  getById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('desafios', (ref) => ref.where('id', '==', id))
        .valueChanges({ idField: 'idDocument' })
        .subscribe((rp) => {
          if (rp[0]?.idDocument) {
            resolve(rp);
          } else {
            resolve(rp);
          }
        });
    });
  }

  getDesafios(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('desafios', (ref) => ref.orderBy('id', 'asc'))
        .valueChanges({ idField: 'idDocument' })
        .subscribe((rp) => {
          if (rp[0]?.idDocument) {
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

  updateDesafios(idDocument, idReto, estudi: Desafio) {
    return this.db
      .collection('desafios', (ref) => ref.where('id', '==', idReto))
      .doc(idDocument)
      .update(estudi);
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deleteDesafios(idDocument, id): Promise<any> {
    this.db
      .collection('desafios', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
