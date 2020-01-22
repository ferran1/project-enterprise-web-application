import { AuthInterceptor } from './auth-interceptor';
import {TestBed} from "@angular/core/testing";
import {SpringSessionService} from "./services/session/spring-session.service";
import {ActivatedRoute} from "@angular/router";


describe('AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpringSessionService,
        ActivatedRoute
      ]
    });
  });

  it('should create an instance of', () => {
    expect(AuthInterceptor).toBeTruthy();
  });
});
