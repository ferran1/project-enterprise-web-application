import {Component, OnInit} from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganisationService} from "../../services/organisation.service";
import {UserService} from "../../services/user.service";
import {FirebaseFileService} from "../../services/firebase-file.service";
import {CmsService} from '../../services/cms.service';
import {DatasetService} from "../../services/dataset.service";

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {
  public CMSContent: Object;
  public readonly componentLink = "org_panel";

  // The current selected organisation in the panel
  currentSelectedOrg: Organisation;
  // All the orgs the logged in user is member of
  userOrganisations: Organisation[];
  // List of members of the current org
  members: User[];
  private selectedUser: User;
  organisationDatasets: Dataset[];
  userIsAdminOfOrgs: boolean;
  private downloadUrl: string;

  public addMemberToggle: boolean;
  public createMemberToggle: boolean;
  public viewDatasetToggle: boolean;
  private viewMetaDataToggle: boolean;

  private searchFilter: String;
  private emptyList: boolean;

  constructor(private organisationService: OrganisationService, private datasetService: DatasetService,
              private userService: UserService, private fileService: FirebaseFileService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cmsService: CmsService) {

    this.members = [];
    this.userOrganisations = [];
    this.organisationDatasets = [];
    this.selectedUser = null;
    this.userIsAdminOfOrgs = false;
    this.addMemberToggle = false;
    this.createMemberToggle = false;

    this.CMSContent = {
      "ORG_PANEL_NO_ORGANISATION_MSG": "",
      "ORG_PANEL_NO_ORGANISATION_BTN": "",
    };
    this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  // Is called when an organisation has been added from the modal (to refresh the members list)
  onAddedRequest(user: User) {
    // Update the view org first
    // console.log(user);
    this.organisationService.addMemberToOrg(this.currentSelectedOrg.id, user.id);
    this.currentSelectedOrg.users.push(user);
    this.members = this.currentSelectedOrg.users;
    // Updates the organisation service which in turn updates the database
    this.createMemberToggle = false; // Close the modal
  }

  // This function is called when another organisation has been selected in the dropdown box
  orgSelectionChanged() {
    // Empty and fill the new members array
    this.members = [];
    if (this.currentSelectedOrg) {
      this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
      this.currentSelectedOrg.users.forEach(u => {
        this.members.push(u)
      });

      //Updates the datasets list when selection changed with correct results
      this.organisationService.getDatasetsByOrganisation(this.currentSelectedOrg.id).subscribe(
        (data: Dataset[]) => {
          this.organisationDatasets = data;
          // console.log(data);
        }, error => {
          console.log(error)
        }
      );
    }
  }

  // Function to delete a member from the organisation
  onDelete(member: User) {
    // console.log("Current selected org: " + this.currentSelectedOrg.name);
    let userId: number = member.id;
    if (confirm("Warning: Are you sure to delete this member with the following email: " + member.email + " from the following organisation: " + this.currentSelectedOrg.name)) {
      this.currentSelectedOrg.users = this.members.filter(u => u.id != member.id);
      this.organisationService.deleteMemberFromOrg(this.currentSelectedOrg.id, userId);
      this.orgSelectionChanged();
    }
  }

  // Called when a modal has been closed
  onCloseReq() {
    // Route stuff
    this.router.navigate(["./"],
      {
        relativeTo: this.activatedRoute,
      });
    this.addMemberToggle = false;
  }

  // Called when an organisation admin wants to delete an organisation
  onDeleteOrganisation() {
    if (confirm("Warning: Are you sure to delete this organisation: " + this.currentSelectedOrg.name)) {
      //Remove the organisation in the backend and front-end services
      this.organisationService.deleteOrganisation(this.currentSelectedOrg);
      this.datasetService.detachDatasetFromOrganisation(this.currentSelectedOrg);
      this.userOrganisations = this.userOrganisations.filter(org => org.id != this.currentSelectedOrg.id);
      this.currentSelectedOrg = this.userOrganisations[this.userOrganisations.length - 1];
      this.orgSelectionChanged();
    }
  }

  onCreateNewMember() {
    this.createMemberToggle = true;
  }

  onAddNewMember() {
    this.addMemberToggle = true;
  }

  onViewDataset(datasetId: number) {
    this.router.navigate(['view-dataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: datasetId}
    });
    this.viewDatasetToggle = true;
  }

  onViewMetaData(datasetId: number){
    this.router.navigate(['view-metadata'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: datasetId}
    });
    this.viewMetaDataToggle = true;
  }

  //Downloads the dataset file by retrieving the specific download url from firebase storage
  onDownload(index: number) {
    let dataset = this.organisationDatasets[index];
    this.downloadUrl = this.fileService.getDownloadUrl(dataset.fileName, dataset.id, dataset.fileType);
  }

  checkIfListEmpty(): void {
    if (this.members.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("list-group-organisation p-1").length == 0;
    }, 5)
  }

  ngOnInit() {
    this.organisationService.getMyOrganisations().subscribe(
      (organisations: Organisation[]) => {
        // console.log(organisations);
        this.userOrganisations = organisations;
        this.currentSelectedOrg = this.userOrganisations[0];
      },
      error => {
        console.log(error)
      },
      () => {
        if (this.currentSelectedOrg) {
          this.currentSelectedOrg.users.forEach(u => this.members.push(u));
          this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
          /*console.log(this.currentSelectedOrg.organisationAdmin);
          console.log("Finished retrieving user's organisations");*/

          //Retrieves datasets of the current selected organisation
          this.organisationService.getDatasetsByOrganisation(this.currentSelectedOrg.id).subscribe(
            (datasets: Dataset[]) => {
              this.organisationDatasets = datasets;
              // console.log(datasets);
            }, error => {
              console.log(error)
            },
            () => {
              // console.log("Finished retrieving datasets of organisation with id: " + this.currentSelectedOrg.id);
            }
          );
        }
      }
    );
  }
}
