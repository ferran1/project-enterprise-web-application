import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseLoginComponent } from './firebase-login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('FirebaseLoginComponent', () => {
  let component: FirebaseLoginComponent;
  let fixture: ComponentFixture<FirebaseLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseLoginComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
