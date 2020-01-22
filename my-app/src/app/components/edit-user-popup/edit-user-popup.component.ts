import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit {
  _editingUser: User;
  @Output() savedUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  set editingUser(user: User) {
    this._editingUser = User.trueCopy(user);
  }

  get editingUser(): User {
    return this._editingUser;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onSaveChanges() {
    this.savedUser.emit(this._editingUser);
  }

  onClose() {
    this.closed.emit(true);
  }
}
