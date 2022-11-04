import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Puntaje } from '../models/Puntaje';

@Injectable()
export class PuntuacionService {
  constructor(public router: Router, private db: AngularFirestore) {}

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

  registerByIdUsuarioLenguaje(id, puntaje, nombre) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
      puntuacionLenguaje: puntaje,
      puntuacionMatematicas: 0,
      puntuacionSociales: 0,
      puntuacionNaturales: 0,
      nombre: nombre,
      totalPuntaje: puntaje,
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

  registerByIdUsuarioMatematicas(id, puntaje, nombre) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
      puntuacionLenguaje: 0,
      puntuacionMatematicas: puntaje,
      puntuacionSociales: 0,
      puntuacionNaturales: 0,
      nombre: nombre,
      totalPuntaje: puntaje,
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

  registerByIdUsuarioSociales(id, puntaje, nombre) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
      puntuacionLenguaje: 0,
      puntuacionMatematicas: 0,
      puntuacionSociales: puntaje,
      puntuacionNaturales: 0,
      nombre: nombre,
      totalPuntaje: puntaje,
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

  registerByIdUsuarioNaturales(id, puntaje, nombre) {
    let puntua = {
      id: `uid${this.makeid(10)}`,
      idUsuario: id,
      puntuacionLenguaje: 0,
      puntuacionMatematicas: 0,
      puntuacionSociales: 0,
      puntuacionNaturales: puntaje,
      nombre: nombre,
      totalPuntaje: puntaje,
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

  getById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('puntaje', (ref) => ref.where('id', '==', id))
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

  getPuntajeByIdUsuario(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('puntaje', (ref) => ref.where('idUsuario', '==', id))
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

  getPuntajes() {
    return this.db
      .collection('puntaje', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges();
  }

  getPuntajesOrderByPuntuacion() {
    return this.db
      .collection('puntaje', (ref) => ref.orderBy('puntuacion', 'asc'))
      .valueChanges();
  }

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updatePuntaje(idDocumentReto, idPuntaje, puntaje: number) {
    return this.db
      .collection('puntaje', (ref) => ref.where('id', '==', idPuntaje))
      .doc(idDocumentReto)
      .update({ totalPuntaje: puntaje });
  }

  updatePuntajeLenguaje(idDocumentPuntaje, idUser, puntaje) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', idUser))
      .doc(idDocumentPuntaje)
      .update({
        puntuacionLenguaje: puntaje,
      });
  }

  updatePuntajeMatematicas(idDocumentPuntaje, idUser, puntaje) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', idUser))
      .doc(idDocumentPuntaje)
      .update({
        puntuacionMatematicas: puntaje,
      });
  }

  updatePuntajeSociales(idDocumentPuntaje, idUser, puntaje) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', idUser))
      .doc(idDocumentPuntaje)
      .update({
        puntuacionSociales: puntaje,
      });
  }

  updatePuntajeNaturales(idDocumentPuntaje, idUser, puntaje) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', idUser))
      .doc(idDocumentPuntaje)
      .update({
        puntuacionNaturales: puntaje,
      });
  }

  updatePuntajeTotal(idDocumentPuntaje, idUser, total) {
    return this.db
      .collection('puntaje', (ref) => ref.where('idUsuario', '==', idUser))
      .doc(idDocumentPuntaje)
      .update({
        totalPuntaje: total,
      });
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deletePuntaje(idDocument, id): Promise<any> {
    this.db
      .collection('puntaje', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
