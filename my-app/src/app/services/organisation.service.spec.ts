import {async, fakeAsync, TestBed} from '@angular/core/testing';

import {OrganisationService} from './organisation.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Organisation} from "../models/organisation";
import {User} from "../models/user";

describe('OrganisationService', () => {

  let service: OrganisationService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OrganisationService]
    })
      .compileComponents();
    service = TestBed.get(OrganisationService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('REST_ORGANISATIONS_URL readonly variable should be the correct link', () => {
    expect(service.REST_ORGANISATIONS_URL).toBe('http://localhost:8080/organisations');
  });

  it('REST_ORG_USERS_URL readonly variable should be the correct link', () => {
    expect(service.REST_ORG_USERS_URL).toBe('http://localhost:8080/organisations/orgMembers');
  });

  // Test if the service getAllOrganisations method returns data from the Spring rest API
  it('should retrieve organisations from the Rest API via GET', () => {
    // Posts to expect we will get from the API, this organisations array will replace the actual data from the rest API
    let organisations = [];
    organisations[0] = new Organisation("Organisation1", new User("Test", false));
    organisations[1] = new Organisation("Organisation2", new User("Test2", false));

    service.getAllOrganisations().subscribe(organisations => {
      expect(organisations.length).toBe(2);
    });

    const request = httpMock.match(`${service.REST_ORGANISATIONS_URL}`);

    expect(request[0].request.method).toBe('GET');
    request[0].flush(organisations);
  });

  // Test the HTTP POST request to add a new organisation to the Spring rest APi
  // it('should upload an organisation to the Rest API Via POST', () => {
  //   let org1 = new Organisation("Organisation1", new User("test@gmail.com", false));
  //
  //   let org2 = service.addOrganisation(org1);
  //   expect(org2.name).toEqual("Organisation1");
  //
  //   const request = httpMock.match(service.REST_ORGANISATIONS_URL);
  //
  //   request[0].flush(org2);
  // });

  afterEach(() => {
    service = null;
    httpMock = null;
});

});
