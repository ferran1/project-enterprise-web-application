import {async, TestBed} from '@angular/core/testing';

import { FbSessionService } from './fb-session.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FbSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FbSessionService],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: FbSessionService = TestBed.get(FbSessionService);
    expect(service).toBeTruthy();
  });
});
