import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganisationPopupComponent } from './edit-organisation-popup.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EditOrganisationPopupComponent', () => {
  let component: EditOrganisationPopupComponent;
  let fixture: ComponentFixture<EditOrganisationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrganisationPopupComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganisationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
