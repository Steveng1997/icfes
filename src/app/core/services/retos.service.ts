import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Retos } from '../models/retos';
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

      imageOpcion1: formularioall.imageOpcion1,
      imageOpcion2: formularioall.imageOpcion2,
      imageOpcion3: formularioall.imageOpcion3,
      imageOpcion4: formularioall.imageOpcion4,

      idsUsuarios: [],
      idsDesafios: [],
      idsRetoPersonal: [],
      image2: formularioall.image2,
      subtitulo: formularioall.subtitulo,
      respuesta: formularioall.respuesta,
      imageResp: formularioall.imageResp,
      titulo: formularioall.titulo,
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

  getRetoPersonalAll() {
    return this.db
      .collection('retos', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges()
  }

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
        .collection('retos', (ref) => ref.orderBy('id', 'asc'))
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

  getByInsert(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('retos')
        .doc(id)
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

  updateIdsRetoPersonal(idDocumentReto, idReto, idsRetoPersonal) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        idsRetoPersonal: idsRetoPersonal,
      });
  }

  updateIdsDesafios(idDocumentReto, idReto, idsDesafios) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        idsDesafios: idsDesafios,
      });
  }

  updateImage1(idDocumentReto, idReto, imageUrl) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({ imageUrl: imageUrl });
  }

  updateImg2(idDocumentReto, idReto, image2) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({ image2: image2 });
  }

  updateOpcImage1(idDocumentReto, idReto, imageOpcion1) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        imageOpcion1: imageOpcion1
      });
  }

  updateOpcImage2(idDocumentReto, idReto, imageOpcion2) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        imageOpcion2: imageOpcion2
      });
  }

  updateOpcImage3(idDocumentReto, idReto, imageOpcion3) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        imageOpcion3: imageOpcion3
      });
  }

  updateOpcImage4(idDocumentReto, idReto, imageOpcion4) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        imageOpcion4: imageOpcion4
      });
  }

  updateOpcImageResp(idDocumentReto, idReto, imageResp) {
    return this.db
      .collection('retos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({
        imageResp: imageResp
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
