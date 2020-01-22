import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

// services
import {FbUserService} from "../../services/fb-user.service";
import {SessionService} from "../../services/session/session.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {CmsService} from 'src/app/services/cms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private emailInput: string;
  private passwordInput: string;

  public CMSContent: Object;
  public readonly componentLink = "log_in";

  @ViewChild("formElement", {static: false}) editForm: NgForm;

  constructor(private userService: FbUserService,
              private sessionService: SpringSessionService,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private cmsService: CmsService) {
    this.emailInput = null;
    this.passwordInput = null;

    this.CMSContent = {
      "LOGIN_TITLE": "",
      "LOGIN_EMAIL": "",
      "LOGIN_PASSWORD": "",
      "LOGIN_BUTTON": "",
      "LOGIN_FORGET": "",
    };
    this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }


  onLogin() {
    this.sessionService.signIn(this.emailInput, this.passwordInput);

    /*if (this.sessionService.signIn(this.email, this.password)){
      this.isValidCredentials = true;
      this.userService.setLoggedInUser();
      console.log(this.userService.getLoggedInUser());
      return this.route.navigate([''], {queryParams: {isValidCredentials: this.isValidCredentials}})
    }
    this.isValidCredentials = false;
    return this.route.navigate(['/login'], {queryParams: {isValidCredentials: this.isValidCredentials}})*/
  }

  ngOnInit() {
    this.sessionService.errorMessage = null;
  }


}
