import {async, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
