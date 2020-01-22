import { Component, OnInit } from '@angular/core';
import {FbSessionService} from "../../services/session/fb-session.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from "firebase";
import {HttpClient} from "@angular/common/http";
import {FbUserService} from "../../services/fb-user.service";

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})
export class FirebaseLoginComponent implements OnInit {
  private password: string;
  private email: string;
  public returnUrl: string;
  private errorMessage: string;

  private readonly DB_USERS = 'https://projectewa-a2355.firebaseio.com/Users.json';

  constructor(private sessionService: FbSessionService, private route: ActivatedRoute, private router: Router) {

  }

  onLogin(){
    this.sessionService.signOn(this.email, this.password).then(
      () => {
        this.router.navigateByUrl(this.returnUrl);
      }
    ).catch(error => {
    console.log(error);
    this.errorMessage = error}
    );


  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/' )
  }

}
