import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Urban Analytics';


  constructor(private router: Router){

  }

  ngOnInit() {
   let firebaseConfig = {
     apiKey: "AIzaSyCihkANi0RepQRSxrqVV6N2GZ9hkgico8A",
     authDomain: "projectewa-a2355.firebaseapp.com",
     databaseURL: "https://projectewa-a2355.firebaseio.com",
     projectId: "projectewa-a2355",
     storageBucket: "projectewa-a2355.appspot.com",
     messagingSenderId: "115134291690",
     appId: "1:115134291690:web:30baf3d606f6bcc4308193",
     measurementId: "G-PDGQZH7H4X"
    };
    firebase.initializeApp(firebaseConfig);
  }


}
