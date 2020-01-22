import {async, TestBed} from '@angular/core/testing';

import {AuthGuardService} from './auth-guard.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {SpringSessionService} from "./session/spring-session.service";

/**
 * @author: Abdul Vahip Zor
 *
 * 7 boundaries which are applied in the test cases:
 *    - Each test uses less than 200ms to run
 */

describe('AuthGuardService', () => {
  let guardService: AuthGuardService;
  let sessionService: SpringSessionService;

  let routeMock: any = {snapshot: {}};
  let routeStateMock: any = {snapshot: {}, url: '/profile'};
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpringSessionService, {provide: Router, useValue: routerMock}],
    })
  }));

  beforeEach(() => {
    guardService = TestBed.get(AuthGuardService);
    sessionService = TestBed.get(SpringSessionService);
  });

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    spyOn(sessionService, 'isAuthenticated').and.returnValue(false);
    expect(guardService.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login'], {queryParams: {return: '/profile'}});
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(sessionService, 'isAuthenticated').and.returnValue(true);
    expect(guardService.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
