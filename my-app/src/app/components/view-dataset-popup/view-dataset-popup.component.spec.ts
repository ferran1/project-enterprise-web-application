import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatasetPopupComponent } from './view-dataset-popup.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ChartsModule} from "ng2-charts";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('ViewDatasetPopupComponent', () => {
  let component: ViewDatasetPopupComponent;
  let fixture: ComponentFixture<ViewDatasetPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDatasetPopupComponent ],
      imports: [ChartsModule, PdfViewerModule, HttpClientTestingModule, RouterTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDatasetPopupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
