import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {FirebaseFileService} from "../../services/firebase-file.service";
import {UserService} from "../../services/user.service";
import {OrganisationService} from "../../services/organisation.service";

import {SpringSessionService} from "../../services/session/spring-session.service";
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-myuploads',
  templateUrl: './myuploads.component.html',
  styleUrls: ['./myuploads.component.css']
})
export class MyuploadsComponent implements OnInit {
  get userDatasets(): Dataset[] {
    return this._userDatasets;
  }
	public CMSContent: Object;
  public readonly componentLink = "my_uploads";

  private _userDatasets: Dataset[];
  private uploadDatasetToggle: boolean;
  private editMetaDataToggle: boolean;
  private viewDatasetToggle: boolean;
  private selectedDataset: Dataset;
  private activeIndex;
  public userId: number;
  private paramSubscription: Subscription;
  protected url: string;

  constructor(private datasetService: DatasetService, private organisationService: OrganisationService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router,
              private fileService: FirebaseFileService,
              private sessionService: SpringSessionService,
              private cmsService: CmsService) {
    this._userDatasets = [];
    this.viewDatasetToggle = false;
    this.editMetaDataToggle = false;
    this.uploadDatasetToggle = false;

    this.CMSContent = {
			"MY_UPLOADS_TITLE": "",
      "MY_UPLOADS_NO_UPLOADS": "",
      "MY_UPLOADS_UPLOAD_BUTTON": "",
      "MY_UPLOADS_DL_HOVER": "",
      "MY_UPLOADS_VIEW_HOVER": "",
      "MY_UPLOADS_EDIT_HOVER": "",
      "MY_UPLOADS_DEL_HOVER": "",
		};
		this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  ngOnInit() {
    this.userId = this.sessionService.getUserId();
    // console.log(this.userService.getLoggedInUser());
    this.paramSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const userEmail = params.email;
      this.datasetService.getAllDatasets().subscribe(
        (data: Dataset[]) => {
          // console.log(data);
          // for each dataset check if dataset exists and if the email of the dataset uploader
          // is equal to the logged in user mail which gets extracted from the URL parameter
          // if true push the dataset to the datasets array else return an empty array
          if (data != null) {
            data.map((dataset: Dataset) => {
              dataset && dataset.user.email == userEmail ? this._userDatasets.push(dataset) : [];
            });
          } else return null;
        },
        (error) => {
          console.log(error);
        },
        () => {
          // console.log("Finished retrieving user's datasets");
        }
      );
      /*this.datasetService.getAllDatasets2().subscribe(
        (data: Dataset[]) => {
          // for each dataset check if dataset exists and if the email of the dataset uploader
          // is equal to the logged in user mail which gets extracted from the URL parameter
          // if true push the dataset to the datasets array else return an empty array
          if (data != null) {
            data.map((o) => {
              o && o.user.email == userEmail ? this.datasets.push(o) : [];
            });
          } else return null;
        }
      );
    }
  );*/
      // this.fileService.getAllFileUrls();
    });

  }

  //This method gets the dataset from child component (edit-metadata-popup) to save the given edited dataset
  saveRequest($event) {
    this.editMetaDataToggle = false;
    // console.log($event);
    // console.log(this.activeIndex);
    //Update (save) the dataset in both arrays
    this._userDatasets[this.activeIndex] = $event;
    this.datasetService.updateDataset(this._userDatasets[this.activeIndex]);
  }

  //Check if edit button is clicked to open pop-up
  onEditMetaDataClick(datasetIndex: number) {
    this.activeIndex = datasetIndex;
    //Create a copy of the dataset so it won't immediately change in dataset overview while editing
    this.selectedDataset = Dataset.trueCopy(this._userDatasets[this.activeIndex]);
    // console.log(this.selectedDataset);
    this.router.navigate(['edit-dataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
    this.editMetaDataToggle = true;
  }

  //Check if upload button is clicked to open upload pop-up
  onUploadButtonClick() {
    this.uploadDatasetToggle = true;
    this.router.navigate(['upload-dataset'], {
      relativeTo: this.activatedRoute
    })
  }

  //Triggers when a dataset has been uploaded to refresh the overview
  onUploadDataset() {
    this._userDatasets = this.datasetService.getMyDatasets();
  }

  //Button to view the dataset visualization/chart
  onViewDatasetClick(datasetIndex: number) {
    this.selectedDataset = Dataset.trueCopy(this._userDatasets[datasetIndex]);
    this.viewDatasetToggle = true;
    this.router.navigate(['view-dataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
  }

  //Function to delete a dataset
  onDelete(datasetIndex: number) {
    let selectedDataset: Dataset = this._userDatasets[datasetIndex];
    // console.log(selectedDataset);
    if (confirm("Are you sure to delete this dataset?")) {
      this.datasetService.deleteDataset(selectedDataset);
      this.fileService.deleteFile(selectedDataset);
      this._userDatasets = this.datasetService.getMyDatasets();
    }
  }

  //Downloads the dataset file by retrieving the specific download url from firebase storage
  onDownload(index: number) {
    let dataset = this._userDatasets[index];
    this.url = this.fileService.getDownloadUrl(dataset.fileName, dataset.id, dataset.fileType);
  }

  //Testing purposes function, adds a random dataset
  onAdd() {
    this.datasetService.addDataset(this.datasetService.generateRandomDataset());
    this._userDatasets = this.datasetService.getMyDatasets();
    // console.log("Adding random dataset..");
  }


  onCloseReq() {
    this.uploadDatasetToggle = false;
    this.viewDatasetToggle = false;
    this.editMetaDataToggle = false;
    this._userDatasets = this.datasetService.getMyDatasets();
    /*this.datasetService.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        data.map( o => o.user.id == this.userId ? this.userDatasets.push(o) : null);
      }
    );*/
  }

}
