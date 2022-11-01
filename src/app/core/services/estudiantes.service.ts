import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class EstudianteService {
  myArray: any[] = [];

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth
  ) { }

  estudiantes: Estudiante[] = [];

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------

  registerAreas(nombre: string) {
    let estudiante = { id: `uid${btoa(nombre)}`, nombre: nombre };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('estudiantes')
        .add(estudiante)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
      // this.authFire.createUserWithEmailAndPassword(email, password)
    });
  }

  // -----------------------------------------------------------------------------------
  // End register
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  getEstudiantesAll() {
    return this.db
      .collection('estudiantes', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges()
  }


  getById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('estudiantes', (ref) => ref.where('id', '==', id))
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

  getByIdUser(id: string): Observable<any> {
    return this.db.collection('estudiantes').doc(id).snapshotChanges();
  }

  getEstudiantes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('estudiantes', (ref) => ref.orderBy('id', 'asc'))
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

  updateEstudiante(idDocument, idReto, estudi: Estudiante) {
    return this.db
      .collection('estudiantes', (ref) => ref.where('id', '==', idReto))
      .doc(idDocument)
      .update(estudi);
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deleteEstudiante(idDocument, id): Promise<any> {
    this.db
      .collection('estudiantes', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
