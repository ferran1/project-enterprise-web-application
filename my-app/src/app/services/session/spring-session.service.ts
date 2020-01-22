import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class SpringSessionService {

  private readonly REST_AUTHENTICATION_URL = "http://localhost:8080/authenticate/login";

  private _token: string;
  public displayName: string;
  private authenticated: boolean;
  private user: User;
  public userEmail: string;
  private userId: number;
  private userIsAdmin: boolean;
  public errorMessage: string;

  private readonly BS_TOKEN_NAME = "tokenName";
  private readonly BS_USER_EMAIL = "userEmail";
  private readonly BS_USER_ID = "id";
  private readonly BS_USER_IS_ADMIN = "admin";

  constructor(private httpClient: HttpClient,
              private route: Router,
              private userService: UserService) {
    this._token = null;
    this.userEmail = null;
    this.errorMessage = null;
    this.authenticated = false;
  }

  signIn(email: String, password: String, errorMessage?: string) {
    return this.httpClient.post<HttpResponse<User>>(this.REST_AUTHENTICATION_URL,
      {email: email, passWord: password}, {observe: "response"}).subscribe(
      (response) => {
        this.authenticated = true;
        this.user = response.body as unknown as User;
        this.userIsAdmin = this.user.isAdmin;
        this.userEmail = ((response.body as unknown) as User).email;
        this.setToken(response.headers.get("Authorization"),
          this.user.email,
          this.user.id,
          this.user.isAdmin);
      },
      (error: HttpErrorResponse) => {
        this.authenticated = false;
        switch (error.status) {
          case 403: {
            this.errorMessage = "Invalid credentials";
            // console.log("Invalid credentials");
            break;
          }
          case 500: {
            this.errorMessage = "User not found";
            // console.log("User not found");
            break;
          }
        }
      },
      () => {
        // console.log("Login successful for user: ", this.user);
        this.userService.setLoggedInUser(this.user);
        return this.route.navigateByUrl("/");
      }
    );
  }

  signOut() {
    this._token = null;
    this.displayName = null;
    this.user = null;
    this.authenticated = false;
    this.setToken(null, null, null, null);
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem("tokenName") != null;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  private setToken(token: string, emailOfUser: string, id: number, isAdmin: boolean): void {
    this._token = token;
    this.userEmail = emailOfUser;
    this.authenticated = true;
    if (token == null) {
      sessionStorage.clear();
      return;
    }
    sessionStorage.setItem(this.BS_TOKEN_NAME, token);
    sessionStorage.setItem(this.BS_USER_EMAIL, emailOfUser);
    sessionStorage.setItem(this.BS_USER_ID, JSON.stringify(id));
    sessionStorage.setItem(this.BS_USER_IS_ADMIN, JSON.stringify(isAdmin));
  }

  public getToken(): string {
    let token = this._token;
    if (token == null) {
      token = sessionStorage.getItem(this.BS_TOKEN_NAME);
      this._token = token;
    }
    return this._token;
  }

  get token(): string {
    return this._token;
  }

  public getUserEmail() {
    let userEmail = this.userEmail;
    if (userEmail == null) {
      userEmail = sessionStorage.getItem(this.BS_USER_EMAIL);
      this.userEmail = userEmail;
    }
    return this.userEmail;
  }

  public getUserId() {
    let userId = this.userId;
    if (userId == null) {
      userId = JSON.parse(sessionStorage.getItem(this.BS_USER_ID));
      this.userId = userId;
    }
    return this.userId;
  }

  public getUserIsAdmin(): boolean {
    if (!this.userIsAdmin) {
      this.userIsAdmin =sessionStorage.getItem(this.BS_USER_IS_ADMIN) == "true";
    }
    return this.userIsAdmin;
  }
}
