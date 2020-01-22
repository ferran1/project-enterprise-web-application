import {Injectable} from '@angular/core';
//Models
import {User} from 'src/app/models/user';
import {Organisation} from 'src/app/models/organisation';
import {SUR_NAMES} from 'src/app/models/testData';
import {UserService} from "./user.service";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SpringSessionService} from "./session/spring-session.service";
import {Dataset} from "../models/dataset";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  readonly REST_ORGANISATIONS_URL = "http://localhost:8080/organisations";
  readonly REST_ORG_USERS_URL = "http://localhost:8080/organisations/orgMembers";
  private organisations: Organisation[];
  private myOrganisations: Organisation[];

  constructor(private userService: UserService,
              private http: HttpClient, private sessionService: SpringSessionService) {
    this.organisations = [];
    this.myOrganisations = [];

    this.getAllOrganisations().subscribe(
      (organisations: Organisation[]) => {
        this.organisations = organisations;
      },
      (error) => console.log("Error when retrieving Organisations: " + error),
      () => {
        // console.log("All Organisations are retrieved correctly!");
        // console.log(this.organisations);
      }
    );
  }

  public getAllOrganisations(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.REST_ORGANISATIONS_URL);
  }

  public getOrganisation(index: number): Organisation {
    return this.organisations[index];
  }


  public getOrganisations(): Organisation[] {
    return this.organisations;
  }

  //Returns an observable which can be subscribed to retrieve user
  public getMyOrganisations() {
    /*this.myOrganisations = this.organisations.filter( org => {
      if(org.users.find(user  => user.id == this.userService.getLoggedInUser().id) ||
      org.organisationAdmin.id == this.userService.getLoggedInUser().id) return org;
      }
    );t
    return this.myOrganisations;*/
    let userId: number;
    if(this.userService.getLoggedInUser()){
       userId = this.userService.getLoggedInUser().id;
    } else userId = parseInt(sessionStorage.getItem("id"));

    return this.http.get(this.REST_ORGANISATIONS_URL + "/find-by-user/" + userId);
  }

  public getDatasetsByOrganisation(orgId: number) {
    let datasets: Dataset[] = [];
    return this.http.get(this.REST_ORGANISATIONS_URL + "/organisation-datasets/" + orgId);/*.subscribe(
      (data: Dataset[]) => {
        datasets = data;
        console.log(data);
      }, error => {
        console.log(error)
      },
      () => {
        return datasets;
        console.log("Finished retrieving datasets of organisation with id: " + orgId);
      }
    );*/
  }

  public addOrganisation(org: Organisation): Organisation {
    this.http.post(this.REST_ORGANISATIONS_URL, org).subscribe(
      (data: Organisation) => {
        this.organisations.push(data);
        return data;
      },
      error => console.log(error),
      () => {
        return null;
        // console.log("Finished posting organisation");
      }
    );
    return org;
  }

  public addMemberToOrg(orgId: number, userId: number) {
    let organisation: Organisation = this.organisations.find(org => org.id == orgId);
    let user: User = this.userService.getUsers().find(u => u.id == userId);
    organisation.users.push(user);
    this.http.post(this.REST_ORGANISATIONS_URL + "/" + orgId + "/" + userId, null).subscribe(
      response => {
         // console.log(response);
      },
      error => console.log(error),
      () => {
        // console.log("Finished adding user to organisation");
      }
    );
    return organisation;
  }

  // Updates or changes the organisation admin user and can change the name of the organisation
  public updateOrgAdminUserAndName(orgId: number, userId: number, orgName?: string) {
    let organisation: Organisation = this.organisations.find(org => org.id == orgId);
    organisation.organisationAdmin = this.userService.getUserById(userId);
    organisation.name = orgName;
    this.http.put(this.REST_ORGANISATIONS_URL + "/" + orgId + "?user=" + userId + "&name=" + orgName, null)
      .subscribe(
        response => {
          // console.log(response)
        },
        error => console.log(error),
        () => {
          // console.log("Updated organisation: ", orgId)
        });
  }

  // Not recommended to use because it can cause json parse errors due to recursion
  public updateOrganisation(index: number, org: Organisation) {
    if (!this.organisations[index] || !org) return false;
    /*this.organisations[index] = org;
    return this.organisations[index].equals(org);*/
    this.http.put(this.REST_ORGANISATIONS_URL, org).subscribe(
      (data: Organisation) => {
        this.organisations[index] = data;
        // console.log(index, this.organisations[index]);
        // console.log(this.organisations);
      },
      error => console.log(error),
      () => {
        // console.log("Finished updating organisation");
      }
    );
  }

  // Gets all members from an organisation
  getOrgMembers(org: Organisation) {
    let orgId;
    if (org) {
      orgId = org.id
    }
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const url = `${this.REST_ORG_USERS_URL}/${orgId}`;

    return this.http.get<User[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteOrganisation(org: Organisation) {
    this.organisations = this.organisations.filter(o => o.id != org.id);
    this.http.delete(this.REST_ORGANISATIONS_URL + "/" + org.id).subscribe(
      (data) => {
        // console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        // console.log("Finished deleting organisation from database");
      }
    )
  }

  // Removes the user first from the organisation list in the service
  // and deletes the member from the org in the database
  public deleteMemberFromOrg(orgId: number, userId: number) {
    let organisation = this.organisations.find(org => org.id == orgId);
    // console.log(organisation);
    organisation.users = organisation.users.filter(user => user.id != userId);
    // Doesn't work properly
    /*let user: User = this.userService.getUserById(userId);
    organisation.removeUser(user);*/
    this.http.delete(this.REST_ORGANISATIONS_URL + "/" + orgId + "/" + userId).subscribe(
      response => {
        // console.log(response)
      },
      error => console.log(error),
      () => {
        // console.log("Finished deleting member from organisation")
      }
    );
  }

  // Function to handle the HTTP errors
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  genRandomOrganisation(): Organisation {
    let user: User = this.userService.getUsers()[Math.floor(Math.random() * this.userService.getUsers().length)]
    return new Organisation(SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase() + " & Co", user);
  }
}
