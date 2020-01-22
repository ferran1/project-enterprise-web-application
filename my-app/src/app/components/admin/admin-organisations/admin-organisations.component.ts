import {Component, OnInit} from '@angular/core';

//Models
import {Organisation} from '../../../models/organisation';
import {User} from 'src/app/models/user';

//Services
import {OrganisationService} from '../../../services/organisation.service';
import {ActivatedRoute, Router} from "@angular/router";
import {DatasetService} from "../../../services/dataset.service";

@Component({
  selector: 'app-admin-organisations',
  templateUrl: './admin-organisations.component.html',
  styleUrls: ['./admin-organisations.component.css']
})
export class AdminOrganisationsComponent implements OnInit {
  organisations: Organisation[];
  editIsClicked: boolean;
  createIsClicked: boolean;
  activeIndex: number;
  selectedOrganisation: Organisation;
  searchFilter: any;
  emptyList: boolean;

  constructor(private aOrganisationService: OrganisationService, private datasetService: DatasetService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activeIndex = null;
    this.searchFilter = '';
    this.selectedOrganisation = null;
    this.editIsClicked = false;
    this.createIsClicked = false;
    this.organisations = [];
  }

  ngOnInit(): void {
    // this.organisations = this.aOrganisationService.getOrganisations();
    this.aOrganisationService.getAllOrganisations().subscribe(
      (data: Organisation[]) => {
        // console.log(data);
        this.organisations = data;
      },
      error => console.log(error),
      () => {
        // console.log("Finished retrieving organisations for admin page");
      }
    );
  }

  onEditClick(originalOrganisationIndex: number): void {
    this.editIsClicked = true;
    let copyOrganisation = Organisation.trueCopy(this.aOrganisationService.getOrganisation(originalOrganisationIndex));
    this.activeIndex = originalOrganisationIndex;
    this.selectedOrganisation = copyOrganisation;
    this.router.navigate(['edit-organisation'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedOrganisation.id}
    });
  }

  onCreateButtonClick() {
    this.createIsClicked = true;
    this.router.navigate(['create-organisation'], {
      relativeTo: this.activatedRoute
    });
  }

  saveRequest($event) {
    this.organisations.push($event);
    this.editIsClicked = false;
    this.createIsClicked = false;
    this.router.navigate(['admin']);
    /*this.organisations[this.activeIndex] = $event;
    this.aOrganisationService.getOrganisations()[this.activeIndex] = $event;*/

  }

  onDeleteClick(org: Organisation) {
    if (confirm("Delete organisation: " + org.name)) {
      this.organisations = this.organisations.filter(organisation => organisation.id != org.id);
      this.datasetService.detachDatasetFromOrganisation(org);
      this.aOrganisationService.deleteOrganisation(org);
    }
  }

  onClose() {
    this.editIsClicked = false;

  }

  createPopUpIsClosed() {
    this.createIsClicked = false;
    this.router.navigate(['admin']);
  }

  editPopUpIsClosed() {
    this.editIsClicked = false;
    this.router.navigate(['admin']);
  }

}
