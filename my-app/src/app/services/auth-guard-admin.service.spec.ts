import {async, TestBed} from '@angular/core/testing';

import { AuthGuardAdminService } from './auth-guard-admin.service';
import {LandingPageComponent} from "../components/landing-page/landing-page.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthGuardAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuardAdminService]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: AuthGuardAdminService = TestBed.get(AuthGuardAdminService);
    expect(service).toBeTruthy();
  });
});
