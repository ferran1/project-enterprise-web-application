import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberPopupComponent } from './add-member-popup.component';
import {UserFilterPipe} from "../pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../../services/organisation.service";
import {UserService} from "../../../services/user.service";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";

describe('AddMemberPopupComponent', () => {

  let component: AddMemberPopupComponent;
  let fixture: ComponentFixture<AddMemberPopupComponent>;
  let componentHTML: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberPopupComponent, UserFilterPipe ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [OrganisationService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // Setup the add member popup component
    fixture = TestBed.createComponent(AddMemberPopupComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;

    // Bypass the *ngIf to get the HTML elements inside the *ngIf
    component.receivedSelectedOrg = new Organisation("Test org", new User("Jason@gmail.com", false));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Search user by email label should be loaded', () => {
     let label = componentHTML.querySelector("#searchLabel");
     expect(label).toBeTruthy();
     expect(label).not.toBeUndefined();
     expect(label.textContent).toMatch("Search user by email");
  });

  it('Should load the h5 title correctly', () => {
    let label = componentHTML.querySelector("#addMemberModalLabel");
    expect(label).toBeTruthy();
    expect(label).not.toBeUndefined();
    expect(label.textContent).toMatch("Add an existing member to " + component.receivedSelectedOrg.name);
  });

});
