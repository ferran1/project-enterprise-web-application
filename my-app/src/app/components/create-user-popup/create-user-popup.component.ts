import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {OrganisationService} from "../../services/organisation.service";
import {NgForm} from "@angular/forms";
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrls: ['./create-user-popup.component.css']
})
export class CreateUserPopupComponent implements OnInit {
  isClicked: boolean = false;

  @Input() user: User;
  @Output() savedUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private aUserService: UserService) {
  }

  ngOnInit() {
    this.isClicked = true;   // if modal is instantiated, isClicked is set to true
  }

	//This method saves the edited changes of a dataset
	onSubmit(form: NgForm) {
		this.savedUser.emit(new User(
			form.value.emailInput,
			form.value.adminInput,
			form.value.firstNameInput,
			form.value.surNameInput,
			form.value.passwordInput
		));
		form.reset();
		this.closed.emit(true);
		// this.aUserService.saveOrCreateUser(new User(null, form.value.emailInput, form.value.passwordInput, form.value.isAdmin,
		// 	form.value.firstName, form.value.surName, this.aOrganisationService.getOrganisationById(parseInt(form.value.orgInput))));
	}

  onClose() {
    this.closed.emit(true);
  }

}
