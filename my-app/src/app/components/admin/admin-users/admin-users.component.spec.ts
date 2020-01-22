import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersComponent } from './admin-users.component';
import {EditUserPopupComponent} from "../../edit-user-popup/edit-user-popup.component";
import {CreateUserPopupComponent} from "../../create-user-popup/create-user-popup.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {SearchUserArrayPipe} from "../../../pipes/search-user-array.pipe";

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersComponent, EditUserPopupComponent, CreateUserPopupComponent, SearchUserArrayPipe ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
