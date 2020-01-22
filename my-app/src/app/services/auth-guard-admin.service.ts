import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from './user.service';
import {SpringSessionService} from "./session/spring-session.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

	constructor(private userService: UserService, private router: Router, private sessionService: SpringSessionService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.sessionService.getToken() == null || undefined) {
			this.router.navigate(['**']);
			return false;
		} else if (this.sessionService.getUserIsAdmin() == false || undefined) {
			this.router.navigate(['**']);
			return false;
		} else return true;
	}
}
