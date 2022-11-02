import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/pre-auth/login/login.component';
import { MenuComponent } from './pages/main/menu/menu.component';
import { RetoAmigoComponent } from './pages/main/reto-amigo/reto-amigo.component';
import { MirarAvanceComponent } from './pages/main/mirar-avance/mirar-avance.component';
import { MenuareaComponent } from './pages/main/menuarea/menuarea.component';
import { LoginGuardian } from './pages/pre-auth/login/login-guardian';
import { AdminComponent } from './pages/pre-auth/admin/admin.component';
import { InsertarUsuario } from './pages/pre-auth/admin/usuarios/insertar-login/insertar-login';
import { UsuariosComponent } from './pages/pre-auth/admin/usuarios/usuarios.component';
import { EditarUserComponent } from './pages/pre-auth/admin/usuarios/editar-user/editar-user.component';
import { RetosComponent } from './pages/main/retos/retos.component';
import { MenuPersonalesComponent } from './pages/main/menu-personales/menu-personales.component';
import { EstudiantesComponent } from './pages/pre-auth/admin/estudiantes/estudiantes.component';
import { InsertarEstudiantesComponent } from './pages/pre-auth/admin/estudiantes/insertar-estudiantes/insertar-estudiantes.component';
import { AdminRetosComponent } from './pages/pre-auth/admin/adminRetos/adminRetos.component';
import { InsertarRetosComponent } from './pages/pre-auth/admin/adminRetos/insertarRetos/insertarRetos.component';
import { EditarRetosComponent } from './pages/pre-auth/admin/adminRetos/editar-retos/editar-retos.component';
import { IncorrectoComponent } from './pages/main/incorrecto/incorrecto.component';
import { CorrectoComponent } from './pages/main/correcto/correcto.component';
import { MenuAreaPersonalComponent } from './pages/main/menu-area-personal/menu-area-personal.component';
import { CorrectoPersonalComponent } from './pages/main/correcto-personal/correcto-personal.component';
import { IncorrectoPersonalComponent } from './pages/main/incorrecto-personal/incorrecto-personal.component';
import { EditarEstudianteComponent } from './pages/pre-auth/admin/estudiantes/editar-estudiante/editar-estudiante.component';
import { PuntajeComponent } from './pages/pre-auth/admin/puntaje/puntaje.component';
import { EditarPuntuacionComponent } from './pages/pre-auth/admin/puntaje/editar-puntuacion/editar-puntuacion.component';
import { PreguntaPersonalComponent } from './pages/main/pregunta-personal/pregunta-personal.component';
import { RespuestaPersonalComponent } from './pages/main/respuesta-personal/respuesta-personal.component';
import { RetoPersonalComponent } from './pages/pre-auth/admin/reto-personal/reto-personal.component';

const routes: Routes = [
  { path: 'menu/:id', component: MenuComponent, canActivate: [LoginGuardian] },

  {
    path: 'ret-amigo/:id',
    component: RetoAmigoComponent,
    canActivate: [LoginGuardian],
  },

  {
    path: 'mir-avanc/:id',
    component: MirarAvanceComponent,
    canActivate: [LoginGuardian],
  },

  {
    path: 'areas/:id',
    component: MenuareaComponent,
    canActivate: [LoginGuardian],
  },

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin/:id',
    component: AdminComponent,
    canActivate: [LoginGuardian],
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'insertar-usuario',
        component: InsertarUsuario,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-usuario/:id',
        component: EditarUserComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'adminRetos',
        component: AdminRetosComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'insertar-retos',
        component: InsertarRetosComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-retos/:id',
        component: EditarRetosComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'estudiantes',
        component: EstudiantesComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'insertar-estudiantes',
        component: InsertarEstudiantesComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-estudiante/:id',
        component: EditarEstudianteComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'puntaje',
        component: PuntajeComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-puntaje/:id',
        component: EditarPuntuacionComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'reto-personal',
        component: RetoPersonalComponent,
        canActivate: [LoginGuardian],
      },
    ],
  },

  {
    path: 'retos/:id/:categoria',
    component: RetosComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'pregPerson/:id/:categoria',
    component: PreguntaPersonalComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'resPerson/:id/:categoria',
    component: RespuestaPersonalComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'menuPersonal/:id',
    component: MenuPersonalesComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'mirarAvance/:id',
    component: MirarAvanceComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'incorrecto/:id',
    component: IncorrectoComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'correcto/:id',
    component: CorrectoComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'menuArea-personal/:id',
    component: MenuAreaPersonalComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'correctoPersonal/:id',
    component: CorrectoPersonalComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'incorrectoPersonal/:id',
    component: IncorrectoPersonalComponent,
    canActivate: [LoginGuardian],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
