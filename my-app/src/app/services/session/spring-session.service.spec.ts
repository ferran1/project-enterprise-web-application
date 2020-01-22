import {async, TestBed} from '@angular/core/testing';

import { SpringSessionService } from './spring-session.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SpringSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SpringSessionService],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: SpringSessionService = TestBed.get(SpringSessionService);
    expect(service).toBeTruthy();
  });
});
