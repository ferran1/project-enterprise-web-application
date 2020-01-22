import {async, TestBed} from '@angular/core/testing';

import {FirebaseFileService} from './firebase-file.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FirebaseFileService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FirebaseFileService],
    })
  }));

  it('should be created', () => {
    const service: FirebaseFileService = TestBed.get(FirebaseFileService);
    expect(service).toBeTruthy();
  });
});
