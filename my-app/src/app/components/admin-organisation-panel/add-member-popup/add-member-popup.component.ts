import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {OrganisationService} from "../../../services/organisation.service";

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;
  @Output() userAdded: EventEmitter<User>;
  @Input() receivedSelectedOrg: Organisation;

  private users: User[];

  searchFilter: string;

  private orgMembers: User[]; // All the members of the current selected organisation

  private emptyList: boolean;
  private errorMessage: string;

  constructor(private userService: UserService, private organisationService: OrganisationService) {
    this.closingToggle = new EventEmitter<boolean>();
    this.userAdded = new EventEmitter<User>();


    this.users = [];
  }

  // Called when the org admin clicks on a user to add the user to the org
  userSelected(user: User) {
    //Checks whether an organisation already contains the given user
    if (this.receivedSelectedOrg.users.find(u => u.id == user.id)) {
      return this.errorMessage = "Error, selected user: " + user.email + " is already in the organisation"
    }
    // Checks whether the logged in organisation admin clicks on itself
    else if (this.receivedSelectedOrg.organisationAdmin.email == user.email){
      return this.errorMessage = "Error, you can't add yourself to the organisation since you are the organisation admin of this organisation (" + this.receivedSelectedOrg.name + ")"
    }
    else {
      if (confirm("Are you sure to add the following user: " + user.email)) {
        this.userAdded.emit(user);
      } else {
        alert("Adding new member has been canceled");
      }
    }
  }

  checkIfListEmpty(): void {
    if (this.users.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("org-admin-user-organisation").length == 0;
    }, 5)
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

    this.orgMembers = [];

    this.organisationService.getOrgMembers(this.receivedSelectedOrg).subscribe(
      (data: User[]) => {
        // console.log(data);
        data.map(o => {
          o ? this.orgMembers.push(o) : [];
        });
      }
    );
  }
}


