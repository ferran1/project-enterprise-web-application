import {ComponentFixture, TestBed, async, fakeAsync, tick, resetFakeAsyncZone} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../services/user.service";
import {OrganisationService} from "../../services/organisation.service";
import {CmsService} from "../../services/cms.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

/**
 * @author: Abdul Vahip Zor
 *
 * 7 boundaries which are applied in the test cases:
 *    - Each test uses less than 200ms to run
 */

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debugElement: DebugElement;
  let componentHTML: HTMLElement;

  let logoImg;
  const testEmail = "testmail@test.nl";

  let sessionService: SpringSessionService;
  let userService: UserService;
  let organisationService: OrganisationService;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SpringSessionService, UserService, OrganisationService, CmsService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    componentHTML = fixture.nativeElement;

    logoImg = componentHTML.querySelectorAll("img");

    sessionService = TestBed.get(SpringSessionService); //Get the session service
    userService = TestBed.get(UserService); //Get the User service
    organisationService = TestBed.get(OrganisationService); //Get the Organisation service
    cmsService = TestBed.get(CmsService); //Get the CMS service

    component.CMSContent = {
      "NAV_HOME": "Home",
      "NAV_MY_UPLOADS": "My upload",
      "NAV_PROFILE": "Profile",
      "NAV_ORG_PANEL": "Organisation panel",
      "NAV_ADMIN": "Admin panel",
      "NAV_LOG_IN": "Log in",
      "NAV_LOG_OUT": "Log out",
    };
  });

  afterEach(() => {
    component = null;
    fixture = null;
    debugElement = null;

    sessionService = null;
    userService = null;
    organisationService = null;
    cmsService = null;
  });

  //Check if component is succesfully getting created
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(sessionService).toEqual(fixture.debugElement.injector.get(SpringSessionService));
    expect(userService).toEqual(fixture.debugElement.injector.get(UserService));
    expect(organisationService).toEqual(fixture.debugElement.injector.get(OrganisationService));
    expect(cmsService).toEqual(fixture.debugElement.injector.get(CmsService));
  });

  //Check if user email is getting displayed in the navbar
  it('should should display logo, Home and login if not authenticated', fakeAsync(() => {
    let sessionSpy;
    setTimeout(() => {
      sessionSpy = spyOn(sessionService, "isAuthenticated").and.returnValue(false);
    }, 1000);
    expect(componentHTML.querySelector("#myuploads-nav")).toBeNull();
    tick(1000);
    expect(componentHTML.querySelector("#myuploads-nav")).toBeFalsy();

    logoImg.forEach((img: HTMLImageElement) => {
      expect(img).toBeTruthy();
    });
    expect(componentHTML.querySelector("#home-nav").innerHTML).toEqual("");
    fixture.detectChanges();
    expect(componentHTML.querySelector("#login-nav").innerHTML).toEqual("Log in");
    expect(componentHTML.querySelector("#home-nav").innerHTML).toEqual("Home");
  }));

  it('should display logo, Home, MyUploads, Profile, Organisation Panel, Log out, user email and Admin if authenticated',
    fakeAsync(() => {
      spyOn(sessionService, "isAuthenticated").and.returnValue(true);
      spyOn(sessionService, "getUserEmail").and.returnValue(testEmail);
      spyOn(sessionService, "getUserIsAdmin").and.returnValue(true);
      tick();
      fixture.detectChanges();
      expect(componentHTML.querySelector("#myuploads-nav").innerHTML).toEqual("My upload");
      expect(componentHTML.querySelector("#profile-nav").innerHTML).toEqual("Profile");
      expect(componentHTML.querySelector("#organisation-nav").innerHTML).toEqual("Organisation panel");
      expect(componentHTML.querySelector("#admin-nav").innerHTML).toEqual("Admin panel");
      expect(componentHTML.querySelector("#logout-nav").innerHTML).toEqual("Log out");
      expect(componentHTML.querySelector("#user-email-nav").innerHTML).toEqual("(User: testmail@test.nl)");
    }));

  it('should display logo, Home, MyUploads, Profile, Organisation Panel, Log out, user email if authenticated',
    fakeAsync(() => {
      spyOn(sessionService, "isAuthenticated").and.returnValue(true);
      spyOn(sessionService, "getUserEmail").and.returnValue(testEmail);
      // If logged in user is not an admin do not show the 'Admin' link
      spyOn(sessionService, "getUserIsAdmin").and.returnValue(false);
      tick();
      fixture.detectChanges();
      expect(componentHTML.querySelector("#myuploads-nav").innerHTML).toContain("My upload");
      expect(componentHTML.querySelector("#profile-nav").innerHTML).toContain("Profile");
      expect(componentHTML.querySelector("#organisation-nav").innerHTML).toContain("Organisation panel");
      expect(componentHTML.querySelector("#admin-nav")).toBeFalsy();
      expect(componentHTML.querySelector("#logout-nav").innerHTML).toContain("Log out");
      expect(componentHTML.querySelector("#user-email-nav").innerHTML).toContain("(User: testmail@test.nl)");
    }));
});
