import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {FbUserService} from "../../services/fb-user.service";
import {User} from "../../models/user";
import {FbSessionService} from "../../services/session/fb-session.service";
import {HttpClient} from "@angular/common/http";
import * as firebase from "firebase";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {DatasetService} from "../../services/dataset.service";
import {UserService} from "../../services/user.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {CmsService} from 'src/app/services/cms.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  set updateButtonToggle(value: boolean) {
    this._updateButtonToggle = value;
  }
  set userCopy(value: User) {
    this._userCopy = value;
  }
  get updateButtonToggle(): boolean {
    return this._updateButtonToggle;
  }
  public CMSContent: Object;
  public readonly componentLink = "profile";

  private readonly REST_USERS_URL = 'http://localhost:8080/users';
  /*private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com';
  private readonly DB_USERS = this.DB_URL + '/Users';*/

  private userId: string;
  private _user: User;
  private _userCopy: User;

  private _updateButtonToggle: boolean;

  @ViewChild('myProfile', {static: false}) myProfile;

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private datasetService: DatasetService,
              private sessionService: SpringSessionService,
              private cmsService: CmsService) {
    this._updateButtonToggle = true;
    this.CMSContent = {
      "PROFILE_FIRSTNAME_EDIT": "",
      "PROFILE_SURNAME_EDIT": "",
      "PROFILE_UPDATE_BUTTON": "",
      "PROFILE_UPDATE_COUNT": "",
    };
    this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  ngOnInit() {
    this._user = this.userService.getLoggedInUser();
    this._userCopy = null;
    if (this._user == null || undefined) {
      let usersList: User[];
      this.userService.getAllUsers().subscribe((users: User[]) => {
          usersList = users;
        },
        (error => console.log(error)),
        () => {
          this._user = usersList.find((user: User) => {
              return user.id == JSON.parse(sessionStorage.getItem("id"));
          });
          this._userCopy = User.trueCopy(this._user);
          if (!this._user.firstName && !this._user.surName) {
            this._updateButtonToggle = false;
          }
        });
    } else {
      this._user = this.userService.getLoggedInUser();
      this._userCopy = User.trueCopy(this._user);
      // console.log(this.userCopy);
      if (!this._user.firstName && !this._user.surName) {
        this._updateButtonToggle = false;
      }

    }
  }

  onUpdateUser() {
    //this.httpClient.put.
    let formControls = this.myProfile.controls;
    if (formControls.firstname.dirty || formControls.surname.dirty || !(this._user.firstName === this._userCopy.firstName) ||
      !(this._user.surName === this._userCopy.surName)) {
      this._user = this._userCopy;
      this.httpClient.put(this.REST_USERS_URL, this._user).subscribe(
        (user) => {
          // console.log("User being sent")
        },
        error => {
          console.log(error)
        },
        () => {
          this._user = User.trueCopy(this._userCopy);
          this.userService.setLoggedInUser(this._user);
          this.myProfile.form.markAsPristine();
          this._updateButtonToggle = true;
        }
      )
    }
  }

  get user(): User {
    return this._user;
  }
  get userCopy(): User {
    return this._userCopy;
  }
}

