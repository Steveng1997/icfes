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
  constructor(public router: Router, private db: AngularFirestore) { }

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
      texto1: formularioall.texto1,
      imageUrl: formularioall.imageUrl,
      texto2: formularioall.texto2,
      opciones: {
        opcion1: formularioall.opcion1,
        opcion2: formularioall.opcion2,
        opcion3: formularioall.opcion3,
        opcion4: formularioall.opcion4,
      },
      imageOpciones: {
        imageOpcion1: formularioall.imageOpcion1,
        imageOpcion2: formularioall.imageOpcion2,
        imageOpcion3: formularioall.imageOpcion3,
        imageOpcion4: formularioall.imageOpcion4,
      },
      idsUsuarios: [],
      image2: formularioall.image2,
      subtitulo: formularioall.subtitulo,
      respuesta: formularioall.respuesta,
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

  registerIdUsuario(formularioall, id) {
    formularioall = {
      idsUsuarios: [],
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref.where('id', '==', id))
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

  getById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref.where('id', '==', id))
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

  getRetosByCategoria(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref.orderBy('categoria', 'asc'))
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

  getByCategoria(categoria: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref.where('categoria', '==', categoria))
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


  getByInsert(urlImg): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos', (ref) => ref
          .where('imageUrl', '==', urlImg))
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
  // Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateRetos(idDocumentReto, idReto, reto: Retos) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update(reto);
  }

  updateIdsUsuarios(idDocumentReto, idReto, idsUsuarios) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        idsUsuarios: idsUsuarios,
      });
  }

  updateImage2(reto: Retos, image2) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            image2: image2
          });
        });
      });
  }

  updateImageOpcion1(reto: Retos, imageOpcion1) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            imageOpciones: {
              imageOpcion1: imageOpcion1,
            }
          });
        });
      });
  }

  updateImageOpcion2(reto: Retos, imageOpcion2) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            imageOpciones: {
              imageOpcion2: imageOpcion2,
            }
          });
        });
      });
  }

  updateImageOpcion3(reto: Retos, imageOpcion3) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            imageOpciones: {
              imageOpcion3: imageOpcion3,
            }
          });
        });
      });
  }

  updateImageOpcion4(reto: Retos, imageOpcion4) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', reto.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            imageOpciones: {
              imageOpcion4: imageOpcion4,
            }
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

  async deleteRetos(idDocument, id): Promise<any> {
    this.db
      .collection('retos', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
