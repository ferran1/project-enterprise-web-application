import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationPopupComponent } from './create-organisation-popup.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateOrganisationPopupComponent', () => {
  let component: CreateOrganisationPopupComponent;
  let fixture: ComponentFixture<CreateOrganisationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationPopupComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganisationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
