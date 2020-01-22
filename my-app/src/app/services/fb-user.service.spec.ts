import {async, TestBed} from '@angular/core/testing';

import {FbUserService} from './fb-user.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FbUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FbUserService]

    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: FbUserService = TestBed.get(FbUserService);
    expect(service).toBeTruthy();
  });
});
