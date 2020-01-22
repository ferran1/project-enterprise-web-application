import {Component, OnInit} from '@angular/core';

//Models
import {Organisation} from '../../../models/organisation';
import {User} from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from "@angular/router";

//Services
// import {FbUserService} from 'src/app/services/fb-user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  editIsClicked: boolean;
  createIsClicked: boolean;
  activeIndex: number;
  selectedUser: User;
  searchFilter: String;
  emptyList: boolean;

  constructor(private aUserService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activeIndex;
    this.selectedUser = null;
    this.editIsClicked;
    this.createIsClicked = false;
    this.searchFilter = "";
  }

  ngOnInit() {
    this.emptyList = this.aUserService.getUsers().length == 0;
  }

  onEditClick(originalUserIndex: number): void {
    this.editIsClicked = true;
    let userToEdit = this.aUserService.getUsers()[originalUserIndex];
    this.activeIndex = originalUserIndex;
    this.selectedUser = userToEdit;
    this.router.navigate(['edit-user'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedUser.id}
    });
  }

  onCreateButtonClick() {
    this.createIsClicked = true;
    this.router.navigate(['create-user'], {
      relativeTo: this.activatedRoute
    });
  }

  createRequest($event): void {
    this.createIsClicked = false;
    this.aUserService.createUser($event).subscribe(
      (user:User) => {
        let u = User.trueCopy(user);
        this.aUserService.getUsers().push(u);
      },
      (err) => console.log(err),
      () => {
        this.router.navigate(['./'], {
          relativeTo: this.activatedRoute
        });
      });
  }

  saveRequest($event): void {
    this.editIsClicked = false;
    this.aUserService.saveUser($event).subscribe(
      () => {
        let u = User.trueCopy($event);
        this.aUserService.getUsers()[this.activeIndex] = u;
      },
      (err) => console.log(err),
      () => {
        this.router.navigate(['admin']);
      });
  }

	onDeleteClick(user: User){
		if(confirm("Delete user: "+ user.email)){
			this.aUserService.deleteUser(user).subscribe(() =>
				(result) => {
					// this.zone.run(() => {
						console.log(result)
					// })
				},
				(err) => console.log(err)
			);
		}
	}

  checkIfListEmpty(): void {
    if (this.aUserService.getUsers().length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("admin-user-organisation").length == 0;
    }, 5)
  }

  createPopUpIsClosed($event: boolean) {
    if ($event == true) {
      this.router.navigate(['admin']);
    }
  }

  editPopUpIsClosed($event: boolean){
    this.editIsClicked = false;
    if ($event == true) {
      this.router.navigate(['admin']);
    }
  }
}
