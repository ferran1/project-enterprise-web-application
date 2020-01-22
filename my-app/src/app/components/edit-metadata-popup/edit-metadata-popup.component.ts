import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../models/dataset";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DatasetService} from "../../services/dataset.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {UserService} from "../../services/user.service";
import {OrganisationService} from "../../services/organisation.service";
import {Organisation} from "../../models/organisation";
import {NgForm} from "@angular/forms";
import {User} from "../../models/user";
import {AdminDatasetsComponent} from "../admin/admin-datasets/admin-datasets.component";

@Component({
  selector: 'app-edit-metadata-popup',
  templateUrl: './edit-metadata-popup.component.html',
  styleUrls: ['./edit-metadata-popup.component.css']
})
export class EditMetadataPopupComponent implements OnInit {

  keys = Object.keys;

  @ViewChild('formElement', {static: false})
  private form: NgForm;
  private Publicity = Publicity;
  private RegionLevel = RegionLevel;
  private queryParamSubscription: Subscription;
  private datasets: Dataset[];
  private listOfYears: number[];

  private editingDataset: Dataset;
  private originalDataset: Dataset;
  @Output() savedDataset: EventEmitter<Dataset>;
  @Output() closingToggle: EventEmitter<boolean>;

  private datasetUserOrganisations: Organisation[];
  private userBelongsToOrganisation: boolean;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private sessionService: SpringSessionService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private organisationService: OrganisationService) {
    // let userId: number = userService.getLoggedInUser().id;
    this.datasets = this.datasetService.getDatasets();
    this.savedDataset = new EventEmitter<Dataset>();
    this.closingToggle = new EventEmitter<boolean>();
    this.listOfYears = [];
    this.datasetUserOrganisations = [];
    this.userBelongsToOrganisation = false;
    for (let i = 1980; i < 2021; i++) {
      this.listOfYears.push(i);
    }
  }


  saveChanges() {
    // console.log(this.editingDataset.organisations);
    //Makes sure the organisations list is empty of the dataset if another publicity has been selected
    // other than GROUP
    if (this.originalDataset.publicity != this.editingDataset.publicity && this.editingDataset.publicity != "GROUP") {
      this.editingDataset.organisations = [];
    }
    this.savedDataset.emit(this.editingDataset);
  }


  onClose() {
    this.queryParamSubscription.unsubscribe();
    this.editingDataset = Dataset.trueCopy(this.originalDataset);
    this.closingToggle.emit(true);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe((param: Params) => {
        const id = param.id;
        for (let i = 0; i < this.datasets.length; i++) {
          if (this.datasets[i].id == id) {
            this.editingDataset = Dataset.trueCopy(this.datasets[i]);
            this.originalDataset = this.datasets[i];

            /*let datasetUser = this.userService.getUserByEmail(this.editingDataset.user.email);
            if (datasetUser.organisations.length) {
              this.userBelongsToOrganisation = true;
              console.log(datasetUser);
              for (let j = 0; j < datasetUser.organisations.length; j++) {
                if (datasetUser.organisations[j] != null || undefined)
                  this.datasetUserOrganisations.push(datasetUser.organisations[i]);
              }
            }*/
            let user: User = this.userService.getLoggedInUser();
            // console.log(user);
            this.userBelongsToOrganisation = user.organisations.length > 0 || user.adminOfOrganisations.length > 0;

            this.organisationService.getMyOrganisations().subscribe(
              (data: Organisation[]) =>
                this.datasetUserOrganisations = data,
              error => console.log(error),
              () => {
                // console.log("Finished setting group items for editing a dataset")
              }
            );
            break;
          }
        }
      }
    )
  }


}
