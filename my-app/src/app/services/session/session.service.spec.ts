import {async, TestBed} from '@angular/core/testing';

import { SessionService } from './session.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SessionService],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });
});
