import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPopupComponent } from './create-user-popup.component';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateUserPopupComponent', () => {
  let component: CreateUserPopupComponent;
  let fixture: ComponentFixture<CreateUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserPopupComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
