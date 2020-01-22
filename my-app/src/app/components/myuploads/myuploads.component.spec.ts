import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MyuploadsComponent} from './myuploads.component';
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {UploadPopUpComponent} from "../upload-pop-up/upload-pop-up.component";
import {FormsModule} from "@angular/forms";
import {EditMetadataPopupComponent} from "../edit-metadata-popup/edit-metadata-popup.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartsModule} from "ng2-charts";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {RouterTestingModule} from "@angular/router/testing";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {User} from "../../models/user";
import {ChartDataSets} from "chart.js";
import {UserService} from "../../services/user.service";

/**
 * Author: Mohamed Ben Ali
 * */
describe('MyuploadsComponent', () => {
  let myUploadsfixture: ComponentFixture<MyuploadsComponent>;
  let myUploads: MyuploadsComponent;
  let myUploadsHtml: HTMLElement;

  let uploadPopupfixture: ComponentFixture<UploadPopUpComponent>;
  let uploadPopup: UploadPopUpComponent;
  let uploadPopupHTML: HTMLElement;

  let viewDatasetPopupFixture: ComponentFixture<ViewDatasetPopupComponent>;
  let viewDatasetPopup: ViewDatasetPopupComponent;

  let editMetadataPopupFixture: ComponentFixture<EditMetadataPopupComponent>;
  let editMetadataPopup: EditMetadataPopupComponent;
  let editMetadataPopupHtml: HTMLElement;


  let datasetService: DatasetService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyuploadsComponent, UploadPopUpComponent, ViewDatasetPopupComponent, EditMetadataPopupComponent],
      imports: [FormsModule, NgSelectModule, ChartsModule, PdfViewerModule, RouterTestingModule, PapaParseModule,
        HttpClientTestingModule],
      providers: []
    })
      .compileComponents(); //Compile the components

  }));

  //Set everything up (create the components)
  beforeEach(() => {
    //Setup my uploads component
    myUploadsfixture = TestBed.createComponent(MyuploadsComponent);
    myUploads = myUploadsfixture.componentInstance;
    myUploadsHtml = myUploadsfixture.debugElement.nativeElement;
    datasetService = myUploadsfixture.debugElement.injector.get(DatasetService); //Get the dataset service
    userService = myUploadsfixture.debugElement.injector.get(UserService);
    myUploadsfixture.detectChanges();

    //Setup upload popup component
    uploadPopupfixture = TestBed.createComponent(UploadPopUpComponent);
    uploadPopup = uploadPopupfixture.componentInstance;
    // uploadPopupHTML = uploadPopupfixture.debugElement.nativeElement;
    uploadPopupfixture.detectChanges();

    //Setup edit dataset popup component
    viewDatasetPopupFixture = TestBed.createComponent(ViewDatasetPopupComponent);
    viewDatasetPopup = viewDatasetPopupFixture.componentInstance;
    viewDatasetPopupFixture.detectChanges();

    editMetadataPopupFixture = TestBed.createComponent(EditMetadataPopupComponent);
    editMetadataPopup = editMetadataPopupFixture.componentInstance;
    editMetadataPopupHtml = editMetadataPopupFixture.debugElement.nativeElement;
    editMetadataPopupFixture.detectChanges();

    RouterTestingModule.withRoutes([
      {path: 'upload-dataset', component: UploadPopUpComponent},
      {path: 'edit-dataset', component: EditMetadataPopupComponent},
      {path: 'view-dataset', component: ViewDatasetPopupComponent}
    ]);

  });

  //Check if the myUploads component is succesfully created
  it('should create the myuploads component and html', () => {
    expect(myUploads).toBeTruthy();
    expect(myUploadsHtml).toBeTruthy();
  });

  //Check if upload popup component is succesfully created
  it('should create the upload popup compnonent', () => {
    expect(uploadPopup).toBeTruthy();
  });

  //Check if the edit dataset component is succesfully created
  it('should create the view dataset popup component', () => {
    expect(viewDatasetPopup).toBeTruthy();
  });

  // Testing whether the upload pop-up window is opened when pressing the upload button click
  it('should open an upload popup on upload dataset button click', () => {
    let uploadButton: HTMLButtonElement = myUploadsHtml.querySelector('#uploadButton');
    spyOn(myUploads, "onUploadButtonClick");
    uploadButton.click();
    myUploadsfixture.detectChanges();
    // expect(uploadButton).toHaveClass("btn btn-primary float-right m-0");
    expect(myUploads.onUploadButtonClick).toHaveBeenCalled();
  });

  // Testing whether the html view is updated when datasets are added to the list
  it("should update HTML list with datasets", () => {
    let user: User = new User("mohamed@hva.nl", true);
    let testingChart: ChartDataSets = {
      data: [10, 11, 12, 13],
      label: "testingLabel",
      type: "bar"
    };
    let chartLabelsX = ["test1", "test2"];
    let testDatasets: Dataset[] = [
      new Dataset("test", "EU_LEVEL", "PUBLIC", user, 2019, testingChart, chartLabelsX,
        null, "My first description", null, 10),
      new Dataset("test2", "EU_LEVEL", "PUBLIC", user, 2019, testingChart, chartLabelsX,
        null, "My second description", null, 11),
      new Dataset("test3", "NAT_LEVEL", "PUBLIC", user, 2020, testingChart, chartLabelsX,
        null, "My third description", null, 12)
    ];
    myUploads.userDatasets.push(testDatasets[0]);
    myUploads.userDatasets.push(testDatasets[1]);
    myUploads.userDatasets.push(testDatasets[2]);
    testDatasets.forEach(d => datasetService.getDatasets().push(d));
    let userDatasetsList: HTMLUListElement = myUploadsHtml.querySelector("ul");
    myUploadsfixture.detectChanges();
    expect(userDatasetsList).toBeDefined();
    expect(userDatasetsList.children.length).toEqual(3);
    expect(datasetService.getDatasets().length).toEqual(3);
    /*console.log(datasetService.getDatasets().length);
    */

  });

  // Testing whether datasets are deleted successfully and the view and service lists are updated accordingly
  it("should delete a dataset from the list and service", () => {
    let user: User = new User("mohamed@hva.nl", true); // Create a user
    user.id = 10; // Set the id of the user
    userService.setLoggedInUser(user); // Set the logged in user in the user service
    let testingChart: ChartDataSets = {
      data: [10, 11, 12, 13],
      label: "testingLabel",
      type: "bar"
    };
    let chartLabelsX = ["test1", "test2"];
    let testDatasets: Dataset[] = [
      new Dataset("test1", "EU_LEVEL", "PUBLIC", user, 2019, testingChart, chartLabelsX,
        null, "My first description", null, 10),
      new Dataset("test2", "EU_LEVEL", "PUBLIC", user, 2019, testingChart, chartLabelsX,
        null, "My second description", null, 11),
      new Dataset("test3", "NAT_LEVEL", "PUBLIC", user, 2020, testingChart, chartLabelsX,
        null, "My third description", null, 12)
    ];
    myUploads.userDatasets.push(testDatasets[0]);
    myUploads.userDatasets.push(testDatasets[1]);
    myUploads.userDatasets.push(testDatasets[2]);
    testDatasets.forEach(d => datasetService.getDatasets().push(d));
    myUploadsfixture.detectChanges();

    let myUploadsList: HTMLUListElement = myUploadsHtml.querySelector("ul.dataList");
    let deleteButton: HTMLButtonElement = myUploadsHtml.querySelector("#deleteButton");
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    deleteButton.click();
    myUploadsfixture.detectChanges();

    expect(myUploadsList.children.length).toEqual(2);
    expect(myUploads.userDatasets.length).toEqual(2);
    expect(datasetService.getDatasets().length).toEqual(2);

  });

  it("should open edit-metadata popup window", () => {
    let user: User = new User("mohamed@hva.nl", true); // Create a user
    user.id = 10; // Set the id of the user
    userService.setLoggedInUser(user); // Set the logged in user in the user service
    let testDatasets: Dataset[] = [datasetService.generateRandomDataset()];
    myUploads.userDatasets.push(testDatasets[0]);
    datasetService.getDatasets().push(testDatasets[0]);

    myUploadsfixture.detectChanges();
    editMetadataPopupFixture.detectChanges();
    let myUploadsList: HTMLUListElement = myUploadsHtml.querySelector("ul.dataList");
    spyOn(myUploads, "onEditMetaDataClick");
    let editMetadataButton: HTMLButtonElement = myUploadsHtml.querySelector("button.btn.btn-primary.fa.fa-edit");
    editMetadataButton.click();

    myUploadsfixture.detectChanges();
    editMetadataPopupFixture.detectChanges();

    expect(myUploadsList.children.length).toEqual(testDatasets.length);
    expect(editMetadataButton.title).toMatch(myUploads.CMSContent['MY_UPLOADS_EDIT_HOVER']);
    expect(myUploads.onEditMetaDataClick).toHaveBeenCalledWith(0);
  });


  //Check if the datasets are succesfully loaded from the database
  // it('should get the datasets from the database', () =>{
  //   //Check if getAllDatasets() does not return an empty list, if not that means the datasets are succesfully retreived
  //   expect(datasetService.getAllDatasets.length).not.toEqual(0);
  // });
  //
  // //Check if the datasets are succesfully loaded into the myuploads component
  // it('should get the datasets from the database', () =>{
  //   //Check if getAllDatasets() does not return an empty list, if not that means the datasets are succesfully loaded into the component
  //   expect(myUploads.userDatasets.length).not.toEqual(0);
  // });

});
