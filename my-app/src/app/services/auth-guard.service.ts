import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {FbSessionService} from "./session/fb-session.service";
import {SpringSessionService} from "./session/spring-session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private sessionService: SpringSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.sessionService.isAuthenticated()){
      // console.log(state.url);
      this.router.navigate(['/login'], {queryParams:
          {return: state.url}});
      return false;
    }
    return true;
  }
}
