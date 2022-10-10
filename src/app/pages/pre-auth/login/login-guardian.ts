import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Observable } from 'rxjs'
import { LoginService } from 'src/app/core/services/login.service'
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class LoginGuardian implements CanActivate {

    constructor(private serviceLogin: LoginService, private router: Router, private afsAuth: AngularFireAuth){}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if(this.serviceLogin.estaLogueado()){
  //       return true;
  //   }
  //   else{
  //       this.router.navigate(['login']);
  //       return false;
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['']);
        }
      }));
  }

  // 
}
