import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Conection a Firebase
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';

// Services
import { LoginService } from './core/services/login.service';
import { RetoService } from './core/services/retos.service';
import { EstudianteService } from './core/services/estudiantes.service';
import { PuntuacionService } from './core/services/puntaje.service';

// Pages-Auth
import { AdminComponent } from './pages/pre-auth/admin/admin.component';
import { LoginComponent } from './pages/pre-auth/login/login.component';
import { UsuariosComponent } from './pages/pre-auth/admin/usuarios/usuarios.component';
import { InsertarUsuario } from './pages/pre-auth/admin/usuarios/insertar-login/insertar-login';
import { EditarUserComponent } from './pages/pre-auth/admin/usuarios/editar-user/editar-user.component';
import { AdminRetosComponent } from './pages/pre-auth/admin/adminRetos/adminRetos.component';
import { InsertarRetosComponent } from './pages/pre-auth/admin/adminRetos/insertarRetos/insertarRetos.component';
import { EditarRetosComponent } from './pages/pre-auth/admin/adminRetos/editar-retos/editar-retos.component';
import { EstudiantesComponent } from './pages/pre-auth/admin/estudiantes/estudiantes.component';
import { InsertarEstudiantesComponent } from './pages/pre-auth/admin/estudiantes/insertar-estudiantes/insertar-estudiantes.component';
import { EditarEstudianteComponent } from './pages/pre-auth/admin/estudiantes/editar-estudiante/editar-estudiante.component';
import { PuntajeComponent } from './pages/pre-auth/admin/puntaje/puntaje.component';
import { EditarPuntuacionComponent } from './pages/pre-auth/admin/puntaje/editar-puntuacion/editar-puntuacion.component';

// Pages-Main
import { MenuComponent } from './pages/main/menu/menu.component';
import { MenuareaComponent } from './pages/main/menuarea/menuarea.component';
import { RetoAmigoComponent } from './pages/main/reto-amigo/reto-amigo.component';
import { MenuPersonalesComponent } from './pages/main/menu-personales/menu-personales.component';
import { MirarAvanceComponent } from './pages/main/mirar-avance/mirar-avance.component';
import { RetosComponent } from './pages/main/retos/retos.component';
import { IncorrectoComponent } from './pages/main/incorrecto/incorrecto.component';
import { CorrectoComponent } from './pages/main/correcto/correcto.component';
import { IncorrectoPersonalComponent } from './pages/main/incorrecto-personal/incorrecto-personal.component';
import { CorrectoPersonalComponent } from './pages/main/correcto-personal/correcto-personal.component';
import { MenuAreaPersonalComponent } from './pages/main/menu-area-personal/menu-area-personal.component';
import { PreguntaPersonalComponent } from './pages/main/pregunta-personal/pregunta-personal.component';
import { RespuestaPersonalComponent } from './pages/main/respuesta-personal/respuesta-personal.component';

// Cookies
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './pages/pre-auth/login/login-guardian';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './core/sidebar/sidebar.component';

firebase.initializeApp({
  apiKey: 'AIzaSyAWFfFTC8gSoctKKst4X1uxVwaFbEB1pXM',
  authDomain: 'icfes-54cbf.firebaseapp.com',
  databaseURL: 'https://icfes-54cbf-default-rtdb.firebaseio.com',
  projectId: 'icfes-54cbf',
  storageBucket: 'icfes-54cbf.appspot.com',
  messagingSenderId: '274684180849',
  appId: '1:274684180849:web:da722162436f8ef1335ed0',
  measurementId: 'G-NP78JG0PNE',
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RetoAmigoComponent,
    MirarAvanceComponent,
    MenuareaComponent,
    InsertarUsuario,
    AdminComponent,
    SidebarComponent,
    UsuariosComponent,
    EditarUserComponent,
    RetosComponent,
    MenuPersonalesComponent,
    MirarAvanceComponent,
    AdminRetosComponent,
    InsertarRetosComponent,
    EstudiantesComponent,
    InsertarEstudiantesComponent,
    EditarRetosComponent,
    IncorrectoComponent,
    CorrectoComponent,
    MenuAreaPersonalComponent,
    CorrectoPersonalComponent,
    IncorrectoPersonalComponent,
    EditarEstudianteComponent,
    PuntajeComponent,
    EditarPuntuacionComponent,
    PreguntaPersonalComponent,
    RespuestaPersonalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule,
    AngularFirestoreModule,
    MatRadioModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment),
  ],

  providers: [
    AngularFireAuth,
    LoginService,
    EstudianteService,
    RetoService,
    PuntuacionService,
    CookieService,
    LoginGuardian,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
