import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadPopUpComponent} from './upload-pop-up.component';
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {PapaParseModule} from "ngx-papaparse";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

/**
 * Author: Mohamed Ben Ali
 * */
describe('UploadPopUpComponent', () => {
  let uploadComponent: UploadPopUpComponent;
  let uploadComponentHtml: HTMLElement;
  let uploadFixture: ComponentFixture<UploadPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPopUpComponent],
      imports: [FormsModule, NgSelectModule, PapaParseModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    uploadFixture = TestBed.createComponent(UploadPopUpComponent);
    uploadComponent = uploadFixture.componentInstance;
    uploadComponentHtml = uploadFixture.debugElement.nativeElement;

    uploadFixture.detectChanges();
  });

  it('should create upload-popup component and html', () => {
    expect(uploadComponent).toBeTruthy();
    expect(uploadComponentHtml).toBeTruthy();
  });

  it("should enable user to upload file to component", () => {
    spyOn(uploadComponent, "uploadListener");
    let input = uploadComponentHtml.querySelector("#uploadModalControlFile1");
    input.dispatchEvent(new Event("change"));
    uploadFixture.detectChanges();
    expect(uploadComponent.uploadListener).toHaveBeenCalled();
  });

  it("should open chart configuration window when csv type file uploaded", () => {
    // let input = uploadComponentHtml.querySelector("#uploadModalControlFile1");
    uploadComponent.fileTypeUploaded = "csv";
    uploadFixture.detectChanges();
    let chartConfiguration: HTMLDivElement = uploadComponentHtml.querySelector("#chartConfiguration");
    let chartConfigurationTitle: HTMLHeadElement = uploadComponentHtml.querySelector("#chartConfiguration div.card-header h5");
    expect(chartConfiguration).not.toBeUndefined();
    expect(chartConfiguration).toBeTruthy();
    expect(chartConfigurationTitle.textContent).toMatch("Chart configuration");
  });

  it("should not open chart configuration window when pdf type file uploaded", () => {
    // let input = uploadComponentHtml.querySelector("#uploadModalControlFile1");
    uploadComponent.fileTypeUploaded = "pdf";
    uploadFixture.detectChanges();
    let chartConfiguration: HTMLDivElement = uploadComponentHtml.querySelector("#chartConfiguration");
    expect(chartConfiguration).toBeFalsy();
  });

  it("should toggle upload pop-up window when close button clicked", () => {
    spyOn(uploadComponent, "onClose");
    let closeButton: HTMLButtonElement = uploadComponentHtml.querySelector("div.modal-footer > button");
    closeButton.click();
    uploadFixture.detectChanges();
    expect(uploadComponent.onClose).toHaveBeenCalled();
  });

});
