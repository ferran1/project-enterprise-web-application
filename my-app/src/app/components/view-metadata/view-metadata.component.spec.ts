import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMetadataComponent } from './view-metadata.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ViewMetadataComponent', () => {
  let component: ViewMetadataComponent;
  let fixture: ComponentFixture<ViewMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMetadataComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
