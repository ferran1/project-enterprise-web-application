import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetDetailComponent } from './dataset-detail.component';
import {ChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseFileService} from "../../../services/firebase-file.service";
import {DatasetService} from "../../../services/dataset.service";

describe('DatasetDetailComponent', () => {
  let component: DatasetDetailComponent;
  let componentHTML: HTMLElement;
  let fixture: ComponentFixture<DatasetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetDetailComponent],
      imports: [ChartsModule, FormsModule, PdfViewerModule, PapaParseModule,
      RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDetailComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

});
