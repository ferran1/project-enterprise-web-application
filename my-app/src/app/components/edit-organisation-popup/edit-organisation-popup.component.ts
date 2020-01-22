import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {Organisation} from "../../models/organisation";
import {OrganisationService} from "../../services/organisation.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-organisation-popup',
  templateUrl: './edit-organisation-popup.component.html',
  styleUrls: ['./edit-organisation-popup.component.css']
})
export class EditOrganisationPopupComponent implements OnInit, OnDestroy {

  @ViewChild('formElement', {static: false})
  private form: NgForm;
  @Output() savedOrganisation: EventEmitter<Organisation> = new EventEmitter<Organisation>();
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private queryParamSubscription: Subscription;
  private selectedOrg: Organisation;
  private editingOrg: Organisation;
  private editingOrgAdminEmail: string;
  private memberToAdd: string;
  private errorMessage: string;


  constructor(private organisationService: OrganisationService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.errorMessage = null

  }

  ngOnInit() {
    this.queryParamSubscription =
      this.route.queryParams.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.selectedOrg = this.organisationService.getOrganisations().find(org => org.id == id);
            this.editingOrg = Organisation.trueCopy(this.selectedOrg);
            this.editingOrgAdminEmail = this.editingOrg.organisationAdmin.email;

            // console.log(this.editingOrg);
          }
        }
      );
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  onSaveChanges() {
    // this.savedOrganisation.emit(this.editingOrg);
    let user: User = this.userService.getUserByEmail(this.editingOrgAdminEmail);
    if (this.editingOrg.users.some(u => u.id == user.id)) {
      this.errorHandling("Organisation administrator needs to be removed from the member's list first");
      return;
    } else {
      this.errorMessage = null;
      this.editingOrg.organisationAdmin = user;
      this.organisationService.updateOrgAdminUserAndName(this.editingOrg.id, this.editingOrg.organisationAdmin.id
        , this.editingOrg.name);
      this.savedOrganisation.emit(this.editingOrg);
    }
  }

  onClose() {
    this.errorMessage = null;
    this.closed.emit(true);
    // this.savedOrganisation.emit(this.editingOrg);
  }

  addMember(email: string) {
    let user: User = this.userService.getUserByEmail(email);
    // console.log(this.editingOrg.users);
    if (user == null || undefined || email == null || undefined) {
      return this.errorHandling("User not found");
    } else if (this.editingOrg.users.includes(user) || this.editingOrg.organisationAdmin.id === user.id) {
      return this.errorHandling("User is already part of this organisation");
    } else {
      // this.editingOrg.addUser(user);
      this.editingOrg = this.organisationService.addMemberToOrg(this.editingOrg.id, user.id);
      this.memberToAdd = null;
    }
  }

  deleteMember(user: User) {
    if (user == null) return;
    this.editingOrg.users = this.editingOrg.users.filter(u => u.id != user.id);
    this.organisationService.deleteMemberFromOrg(this.editingOrg.id, user.id);
    // console.log(this.editingOrg.users);
  }

  errorHandling(error: string) {
    switch (error) {
      case "User not found": {
        return this.errorMessage = error;
      }
      case "User is already part of this organisation": {
        return this.errorMessage = error;
      }
      case "Organisation administrator needs to be removed from the member's list first": {
        return this.errorMessage = error;
      }
    }
  }

}
