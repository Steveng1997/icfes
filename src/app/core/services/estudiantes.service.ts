import { Injectable } from '@angular/core'
import 'firebase/compat/app'
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class EstudianteService {

  myArray: any[] = []

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth,
  ) { }

  estudiantes: Estudiante[] = [];

  registerAreas(nombre: string) {
    let estudiante = { id: `uid${btoa(nombre)}`, nombre: nombre }
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

  getByIdUser(id: string): Observable<any> {
    return this.db.collection('estudiantes').doc(id).snapshotChanges();
  }

  getEstudiantes(): Observable<any> {
    return this.db.collection('estudiantes', ref => ref.orderBy('id', 'asc')).snapshotChanges();
  }

  async deleteUsuario(id: string): Promise<any> {
    this.db.collection('estudiantes', (ref) =>
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