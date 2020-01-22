import {async, TestBed} from '@angular/core/testing';

import { FirebaseDatasetService } from './firebase-dataset.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseFileService} from "./firebase-file.service";
import {FbUserService} from "./fb-user.service";

describe('FirebaseDatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FirebaseDatasetService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: FirebaseDatasetService = TestBed.get(FirebaseDatasetService);
    expect(service).toBeTruthy();
  });
});
