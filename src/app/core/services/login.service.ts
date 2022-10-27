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
  ) { }

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
      // this.authFire.createUserWithEmailAndPassword(email, password)
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
      .collection('usuarios', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }
  
  getByName(email) {
    return this.db
      .collection('usuarios', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }

  emailExistAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('usuarios', (ref) =>
          ref
            .where('email', '==', email)
            .where('password', '==', password)
        )
        .valueChanges()
        .subscribe((rp) => {
          if (rp[0]) {
            resolve(rp);
          } else {
            resolve(rp);
          }
        });
    });
  }

  getUsuarios(): Observable<any> {
    return this.db
      .collection('usuarios', (ref) => ref.orderBy('id', 'asc'))
      .snapshotChanges();
  }

  getAll() {
    return this.db.collection('usuarios').snapshotChanges();
  }

  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateUsuarios(user: Usuario) {
    return this.db
      .collection('usuarios', (ref) => ref.where('id', '==', user.id))
      .get()
      .forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(user);
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
      .collection('usuarios', (ref) => ref.where('id', '==', id))
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

  // -----------------------------------------------------------------------------------
  // Login
  // -----------------------------------------------------------------------------------

  isAuth() {
    return this.authFire.authState.pipe(map((auth) => auth));
  }

  logoutUser() {
    return this.authFire.signOut();
  }

  // -----------------------------------------------------------------------------------
  // End Login
  // -----------------------------------------------------------------------------------
}
