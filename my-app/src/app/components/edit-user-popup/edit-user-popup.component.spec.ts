import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPopupComponent } from './edit-user-popup.component';
import {FormsModule} from "@angular/forms";

describe('EditUserPopupComponent', () => {
  let component: EditUserPopupComponent;
  let fixture: ComponentFixture<EditUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPopupComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
