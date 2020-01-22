import {async, TestBed, tick} from '@angular/core/testing';

import { DatasetService } from './dataset.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FirebaseFileService} from "./firebase-file.service";
import {UserService} from "./user.service";
import {Dataset} from "../models/dataset";
import {Organisation} from "../models/organisation";
import {User} from "../models/user";

/**
 * Author: Mohamed Ben Ali
 * */
describe('DatasetService', () => {

  let datasetService: DatasetService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DatasetService]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    datasetService = TestBed.get(DatasetService);
  }));

  it('should be created', () => {
    const service: DatasetService = TestBed.get(DatasetService);
    expect(service).toBeTruthy();
  });

  // Backend dataset list is initially empty when the backend isn't running
  it("should retrieve datasets from rest API", () => {
    let listOfDatasets: Dataset[] = [];
    datasetService.getAllDatasets().subscribe(
      (data)=> {
        listOfDatasets = data;
      }
    );
    expect(listOfDatasets.length).toEqual(0);
  });

  it("should detach dataset(s) from a given organisation", () => {
    let testUser: User = new User("mohamed@hva.nl", true);
    let testDataset: Dataset = datasetService.generateRandomDataset();
    let testOrganisation: Organisation = new Organisation("testOrg", testUser);

    testDataset.organisations = [testOrganisation];
    datasetService.addDataset(testDataset);
    expect(datasetService.getDatasets()).toContain(testDataset);
    datasetService.detachDatasetFromOrganisation(testOrganisation);
    expect(testDataset.organisations.length).toEqual(0);
  });




});
