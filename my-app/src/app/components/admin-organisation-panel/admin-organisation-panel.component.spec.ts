import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationPanelComponent } from './admin-organisation-panel.component';
import {AddMemberPopupComponent} from "./add-member-popup/add-member-popup.component";
import {CreateMemberPopupComponent} from "./create-member-popup/create-member-popup.component";

import {FormsModule} from "@angular/forms";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../services/organisation.service";
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {ViewMetadataComponent} from "../view-metadata/view-metadata.component";
import {UserFilterPipe} from "./pipes/user-filter-pipe";
import {Organisation} from "../../models/organisation";
import {User} from "../../models/user";
import {SessionService} from "../../services/session/session.service";
import {Dataset} from "../../models/dataset";

describe('AdminOrganisationPanelComponent', () => {

  // Admin organisation panel component
  let component: AdminOrganisationPanelComponent;
  let fixture: ComponentFixture<AdminOrganisationPanelComponent>;
  let componentHTML: HTMLElement;

  let addMembercomponent: AddMemberPopupComponent;
  let addMemberfixture: ComponentFixture<AddMemberPopupComponent>;
  let addMembercomponentHTML: HTMLElement;

  let organisationService: OrganisationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationPanelComponent, AddMemberPopupComponent, CreateMemberPopupComponent, ViewDatasetPopupComponent, ViewMetadataComponent, UserFilterPipe],
      imports: [FormsModule, ChartsModule, PdfViewerModule, RouterTestingModule, HttpClientTestingModule],
      providers: [OrganisationService, SessionService]
    }).compileComponents(); // Compile template and css
  }));

  beforeEach(() => {
    // Set up the admin organisation panel component
    fixture = TestBed.createComponent(AdminOrganisationPanelComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;

    // Set up the Add member popup component
    addMemberfixture = TestBed.createComponent(AddMemberPopupComponent);
    addMembercomponent = addMemberfixture.componentInstance;
    addMembercomponentHTML = addMemberfixture.debugElement.nativeElement;

    // Setup the organisation service
    organisationService = TestBed.get(OrganisationService);

    // Bypass the *ngIfs to be able to get the HTML elements of the component
    component.userOrganisations.push(new Organisation("Test org", new User("Test user", false)));
    component.userIsAdminOfOrgs = true;

    fixture.detectChanges();
  });

  // Check if the component has been compiled successfully
  it('should create the admin organisation component', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  // Check if the componentLink property contains the text "org_panel"
  it('componentLink property should contain `org_panel`', () => {
    expect(component.componentLink).toBe('org_panel');
  });

  // Check if the boolean toggles to open the popups are working correctly
  it('should toggle the `addMemberToggle` boolean (to open the add member popup)', () => {
    expect(component.addMemberToggle).toBeFalsy();
    component.onAddNewMember();
    expect(component.addMemberToggle).toBeTruthy();
  });

  it('should toggle the `createMemberToggle` boolean (to open the create member popup)', () => {
    expect(component.createMemberToggle).toBeFalsy();
    component.onCreateNewMember();
    expect(component.createMemberToggle).toBeTruthy();
  });

  it('should toggle the `viewDatasetToggle` boolean (to open the view dataset popup)', () => {
    expect(component.viewDatasetToggle).toBeFalsy();
    component.onViewDataset(0);
    expect(component.viewDatasetToggle).toBeTruthy();
  });

  it('should load the h4 title correctly', () => {
    fixture.detectChanges();

    let title = componentHTML.querySelector("#selectOrganisation");
    expect(title).not.toBeUndefined();
    expect(title).toBeTruthy();
    expect(title.textContent).toMatch("Select an organisation");
    expect(title).toHaveClass("selectAnOrg");
  });

  it('should load the search user input if an organisation with members is selected in the select box', () => {
    component.currentSelectedOrg = new Organisation("Test organisation", new User("test@gmail.com", false));
    component.members.push(new User("test@gmail.com", false));

    fixture.detectChanges();

    let input: HTMLInputElement = componentHTML.querySelector("#searchEmailFilter");
    expect(input).toBeTruthy();
    expect(input).not.toBeUndefined();
  });

  // Checks if the Admin organisation buttons appear in the HTML template if an organisation admin is logged in
  it('if organisation admin is logged in, it should display the org admin buttons', () => {
    expect(componentHTML.querySelector('#addMemberButton')).not.toBe(null);
    expect(componentHTML.querySelector("#addMemberButton").innerHTML).toEqual("Add existing user");

    expect(componentHTML.querySelector('#createMemberButton')).not.toBe(null);
    expect(componentHTML.querySelector("#createMemberButton").innerHTML).toEqual("Create new user");

    expect(componentHTML.querySelector('#deleteOrganisationButton')).not.toBe(null);
    expect(componentHTML.querySelector("#deleteOrganisationButton").innerHTML).toEqual("Delete organisation");
  });

  // If an organisation admin selected an organisation in the panel, it should display the correct information in the HTML template
  it('it should display the correct information in the HTML template when an organisation admin selected an organisation in the HTML template', () => {
    // Set the current selected organisation
    component.currentSelectedOrg = new Organisation("Test organisation", new User("test@gmail.com", false));

    // Get the HTML elements
    let selectedOrganisationLabel = componentHTML.querySelector('#selectedOrganisation');
    expect(selectedOrganisationLabel).not.toBeUndefined();
    expect(selectedOrganisationLabel).toBeTruthy();
    expect(selectedOrganisationLabel.textContent).toMatch("Selected organisation:");
    expect(component.currentSelectedOrg.name).toMatch("Test organisation");

    let organisationAdminLabel = componentHTML.querySelector('#organisationAdmin');
    expect(organisationAdminLabel).not.toBeUndefined();
    expect(organisationAdminLabel).toBeTruthy();
    expect(organisationAdminLabel.textContent).toMatch("Organisation admin:");
    expect(component.currentSelectedOrg.organisationAdmin.email).toMatch("test@gmail.com");

    let amountOfMembersLabel = componentHTML.querySelector('#amountOfMembers');
    expect(amountOfMembersLabel).not.toBeUndefined();
    expect(amountOfMembersLabel).toBeTruthy();
    expect(amountOfMembersLabel.textContent).toMatch("Amount of members:");
  });

  // Checks if deleteOrganisation() method in the service is called when component delete button has been clicked
  it('Should call deleteOrganisation() in the organisation service when the delete button has been clicked', () => {
    let spy = spyOn(organisationService, "deleteOrganisation").and.callThrough();

    // Make sure the currentSelectedOrg is set with an organisation because deleteOrganisation() this instance variable as the parameter
    component.currentSelectedOrg = new Organisation("Test Organisation", new User("Test12@gmail.com", false));

    // Get the HTML button from the template and 'Click' on the button
    let button: HTMLButtonElement = componentHTML.querySelector('#deleteOrganisationButton');
    button.click();

    fixture.detectChanges();

    // Make sure we're able to bypass the confirmation dialog box
    spyOn(window, "confirm").and.callFake(function () {
      return true;
    });

    fixture.detectChanges();

    expect(spy);
    expect(spy).toHaveBeenCalled();
  });

  it('should open the add member popup on `Add existing user` button onClick', () => {
    spyOn(component, "onAddNewMember");

    let addUserButton: HTMLButtonElement = componentHTML.querySelector('#addMemberButton');
    addUserButton.click();

    fixture.detectChanges();
    expect(component.onAddNewMember).toHaveBeenCalled();
  });

  it('should open the create popup on `Create new user` button onClick', () => {
    spyOn(component, "onCreateNewMember");

    let createUserButton: HTMLButtonElement = componentHTML.querySelector('#createMemberButton');
    createUserButton.click();

    fixture.detectChanges();
    expect(component.onCreateNewMember).toHaveBeenCalled();
  });

  it('should not display the `organisation does not have any shared datasets` span message when the selected organisation does have shared datasets', () => {
    // Add a dataset to the organisation datasets array
    component.organisationDatasets.push(new Dataset("Test dataset", "European", "Public", new User("test@gmail.com", false), 2018, Dataset.generateChartDataset(), ["Test"], "test"));

    fixture.detectChanges();

    // If the message is null, it means it is not being shown in HTML template which is correct since we added a dataset to the array
    let message = componentHTML.querySelector('#noDatasetSpanMessage');
    expect(message).toBeNull();
  });

  afterEach(() => {
    component = null;
    fixture = null;
    componentHTML = null;
    organisationService = null;
  });

});
