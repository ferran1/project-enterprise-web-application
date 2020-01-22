import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberPopupComponent } from './create-member-popup.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DebugElement} from "@angular/core";

describe('CreateMemberPopupComponent', () => {

  let createMemberPopupComponent: CreateMemberPopupComponent;
  let createMemberPopupFixture: ComponentFixture<CreateMemberPopupComponent>;
  let createMemberPopupElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemberPopupComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // Setup the create member popup component
    createMemberPopupFixture = TestBed.createComponent(CreateMemberPopupComponent);
    createMemberPopupComponent = createMemberPopupFixture.componentInstance;
    createMemberPopupElement = createMemberPopupFixture.debugElement;
    createMemberPopupFixture.detectChanges();
  });

  it('should create', () => {
    expect(createMemberPopupComponent).toBeTruthy();
  });
});
