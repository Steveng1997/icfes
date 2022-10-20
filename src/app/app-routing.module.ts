import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/pre-auth/login/login.component';
import { MenuComponent } from './pages/main/menu/menu.component';
import { RetoAmigoComponent } from './pages/main/reto-amigo/reto-amigo.component';
import { RetoPersonalComponent } from './pages/main/reto-personal/reto-personal.component';
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
import { SidebarComponent } from './core/sidebar/sidebar.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, canActivate: [LoginGuardian] },

  {
    path: 'ret-amigo',
    component: RetoAmigoComponent,
    canActivate: [LoginGuardian],
  },

  {
    path: 'ret-personal',
    component: RetoPersonalComponent,
    canActivate: [LoginGuardian],
  },

  {
    path: 'mir-avanc',
    component: MirarAvanceComponent,
    canActivate: [LoginGuardian],
  },

  { path: 'areas', component: MenuareaComponent, canActivate: [LoginGuardian] },

  { path: '', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'admin',
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
        path: 'estudiantes',
        component: EstudiantesComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'insertar-estudiantes',
        component: InsertarEstudiantesComponent,
        canActivate: [LoginGuardian],
      },
    ],
  },

  {
    path: 'retos/:categoria',
    component: RetosComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'menuPersonal',
    component: MenuPersonalesComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'mirarAvance',
    component: MirarAvanceComponent,
    canActivate: [LoginGuardian],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forChild(routes)],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
