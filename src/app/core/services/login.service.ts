import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Usuario } from '../models/login';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  myArray: any[] = [];

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth
  ) {}

  usuarios: Usuario[] = [];

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

  registerUser(email: string, nombre: string, password: string, rol: string) {
    let user = {
      id: `uid${this.makeid(10)}`,
      email: email,
      nombre: nombre,
      password: password,
      rol: rol,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('usuarios')
        .add(user)
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
        .collection('usuarios', (ref) => ref.where('id', '==', id))
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

  getByEmail(email): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('usuarios', (ref) => ref.where('email', '==', email))
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

  emailExistAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('usuarios', (ref) =>
          ref.where('email', '==', email).where('password', '==', password)
        )
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

  getUsuariosByDocument(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('usuarios', (ref) => ref.where('id', '==', id))
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

  getUsuarios(){
     return this.db
        .collection('usuarios', (ref) => ref.orderBy('id', 'asc'))
        .valueChanges()
  }

  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateUsuarios(idDocument, idUser, user: Usuario) {
    return this.db
      .collection('usuarios', (ref) => ref.where('id', '==', idUser))
      .doc(idDocument)
      .update(user);
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deleteUsuario(idDocument, id): Promise<any> {
    this.db
      .collection('usuarios', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}
