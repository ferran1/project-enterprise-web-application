import { Injectable } from '@angular/core';
import {FbUserService} from "../fb-user.service";

@Injectable({
	providedIn: 'root'
})
export class SessionService {
	userMail: string;
	isValid: boolean = false;

  constructor(private aUserService: FbUserService) { }

	signOn(eMail: string, passWord: string) {
		for (let i = 0; i < this.aUserService.getUsers().length; i++) {
			let user = this.aUserService.getLoggedInUser();
			if (eMail == user.email && passWord == user.passWord) {
				this.userMail = eMail;
				return this.isValid = true;
			}
		}
		return this.isValid;
	}

	SignOff() {
		this.userMail = null;
		this.isValid = true;
	}
}
