import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {FbUserService} from "../fb-user.service";

@Injectable({
  providedIn: 'root'
})
export class FbSessionService {
  public isAdmin: boolean = false;
  public displayName: string;
  token: string;
  public authenticated: boolean;

  constructor(private userService: FbUserService) {
    this.authenticated = false;
  }


  signOn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser.getIdToken().then(token => {
          this.token = token;
          // this.userService.saveLoggedInUser();
          this.userService.setLoggedInUser();
          this.userService.saveAllUsers();
        });
        this.authenticated = true;
        this.displayName = firebase.auth().currentUser.email;
        // this.isAdmin = this.userService.getLoggedInUser().isAdmin;
        return response;
      }
    )
  }

  signOff() {
    console.log("Signing out");
    this.isAdmin = false;
    this.displayName = null;
    this.authenticated = false;
    this.token = null;
    return firebase.auth().signOut();
  }

  public getTokenId() {
    return this.token;
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyCihkANi0RepQRSxrqVV6N2GZ9hkgico8A",
      authDomain: "projectewa-a2355.firebaseapp.com",
      databaseURL: "https://projectewa-a2355.firebaseio.com",
      projectId: "projectewa-a2355",
      storageBucket: "projectewa-a2355.appspot.com",
      messagingSenderId: "115134291690",
      appId: "1:115134291690:web:30baf3d606f6bcc4308193",
      measurementId: "G-PDGQZH7H4X"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }


}
