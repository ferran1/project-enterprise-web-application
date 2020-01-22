import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditMetadataPopupComponent} from './edit-metadata-popup.component';
import {ChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DatasetService} from "../../services/dataset.service";
import {Dataset} from "../../models/dataset";
import {MyuploadsComponent} from "../myuploads/myuploads.component";
import {UploadPopUpComponent} from "../upload-pop-up/upload-pop-up.component";
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PapaParseModule} from "ngx-papaparse";
import {Router} from "@angular/router";

describe('EditMetadataPopupComponent', () => {
  let editMetaFixture: ComponentFixture<EditMetadataPopupComponent>;
  let editMetaComponent: EditMetadataPopupComponent;
  let editMetaHtml: HTMLElement;

  let myUploadsFixture: ComponentFixture<MyuploadsComponent>;
  let myuploadsComponent: MyuploadsComponent;
  let myUploadsHtml: HTMLElement;

  let router: Router;
  let datasetService: DatasetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [EditMetadataPopupComponent, MyuploadsComponent, UploadPopUpComponent, ViewDatasetPopupComponent],
      imports: [FormsModule, ChartsModule, NgSelectModule, PdfViewerModule, PapaParseModule,
        RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    editMetaFixture = TestBed.createComponent(EditMetadataPopupComponent);
    editMetaComponent = editMetaFixture.componentInstance;
    editMetaHtml = editMetaFixture.debugElement.nativeElement;

    myUploadsFixture = TestBed.createComponent(MyuploadsComponent);
    myuploadsComponent = myUploadsFixture.componentInstance;
    myUploadsHtml = myUploadsFixture.debugElement.nativeElement;

    router = TestBed.get(Router);
    datasetService = editMetaFixture.debugElement.injector.get(DatasetService);
    editMetaFixture.detectChanges();

    RouterTestingModule.withRoutes([
      {path: 'upload-dataset', component: UploadPopUpComponent},
      {path: 'edit-dataset', component: EditMetadataPopupComponent},
      {path: 'view-dataset', component: ViewDatasetPopupComponent}
    ]);
  });

  it('should create edit-metadata component', () => {
    expect(editMetaComponent).toBeTruthy();
    expect(editMetaHtml).toBeTruthy();
  });



});
