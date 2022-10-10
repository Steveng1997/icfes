import { Injectable } from '@angular/core'
import 'firebase/compat/app'
import { Usuario } from '../models/login'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  myArray: any[] = []

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth,
  ) { }

  usuarios: Usuario[] = [];

  registerUser(email: string, password: string, rol: string) {
    let user = { email: email, password: password, id: `uid${btoa(email)}`, rol: rol }
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

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authFire.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        );
      // err => alert("usuario incorrecto"));
    });
  }

  isAuth() {
    return this.authFire.authState.pipe(map(auth => auth));
  }

  logoutUser() {
    return this.authFire.signOut();
  }


  emailExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.collection('usuarios', (ref) =>
        ref.where('email', '==', email)
      )
        .valueChanges({ idField: 'id' })
        .subscribe((rp) => {
          if (rp[0]?.id) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  rolAdministradorByEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.collection('usuarios', (ref) =>
        ref.where('email', '==', email).
          where('rol', '==', 'administrador')
      )
        .valueChanges({ idField: 'id' })
        .subscribe((rp) => {
          if (rp[0]?.id) {
            resolve(true);
            // this.router.navigate(['admin/usuarios'])
          } else {
            resolve(false);
            // this.router.navigate(['menu'])
          }
        });
    });
  }


  rolAdministrador(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.collection('usuarios', (ref) =>
        ref.where('rol', '==', 'estudiantes')
      )
        .valueChanges({ idField: 'id' })
        .subscribe((rp) => {
          if (rp[0]?.id) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  getByIdUser(id: string): Observable<any> {
    return this.db.collection('usuarios').doc(id).snapshotChanges();
  }

  getUsuarios(): Observable<any> {
    return this.db.collection('usuarios', ref => ref.orderBy('id', 'asc')).snapshotChanges();
  }

  async deleteUsuario(id: string): Promise<any> {
    this.db.collection('usuarios', (ref) =>
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


  updateUser(id: string, data: any): Promise<any> {
    return this.db.collection('usuarios').doc(id).update(data);
  }
}