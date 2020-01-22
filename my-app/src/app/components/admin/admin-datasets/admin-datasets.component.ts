import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

//Model
import {Dataset} from '../../../models/dataset';
import {UsersEnum} from 'src/app/models/enums/admin-sort-enums'

//Services
import {FirebaseDatasetService} from 'src/app/services/firebase-dataset.service';
import {DatasetService} from "../../../services/dataset.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './admin-datasets.component.html',
  styleUrls: ['./admin-datasets.component.css']
})
export class AdminDatasetsComponent implements OnInit {
  datasets: Dataset[];
  uploadIsClicked: boolean;
  editIsClicked: boolean;
  viewDatasetToggle: boolean;
  selectedDataset: Dataset;
  searchFilter: String;
  emptyList: boolean;
  private activeIndex;

	constructor(private datasetService: DatasetService, private router: Router,
              private route: ActivatedRoute) {
		this.uploadIsClicked, this.editIsClicked = false;
		this.searchFilter = "";
		this.datasets = [];
	}

	ngOnInit() {
		this.emptyList = this.datasets.length == 0;
		this.datasetService.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        this.datasets = data;
      },
      error => console.log(error),
      () => {
        // console.log("Finished retrieving datasets for admin");
      }
    );
	}

  //This method gets the event from child component (edit-pop-up) to save the edited dataset
  saveRequest($event: Dataset) {
    this.editIsClicked = false;
    //Update (save) the dataset in both arrays
    // console.log($event);
    this.datasets[this.activeIndex] = $event;
    this.datasetService.updateDataset($event);
  }

  //Check if edit button is clicked to open pop-up
  onEditButtonClick(dataset: Dataset) {
    this.activeIndex = this.datasets.indexOf(dataset);
    //Create a copy of the dataset so it won't immediately change in dataset overview while editing
    this.selectedDataset = Dataset.trueCopy(this.datasets[this.activeIndex]);
    this.editIsClicked = true;
    this.router.navigate(['edit-dataset'], {
      relativeTo: this.route,
      queryParams: {id: dataset.id}
    });
  }

  onViewDataset(dataset: Dataset){
	  this.viewDatasetToggle = true;
	  this.selectedDataset = Dataset.trueCopy(dataset);
	  this.router.navigate(['view-dataset'],
      {
        relativeTo: this.route,
        queryParams: {id: dataset.id}
      });

  }

  onDeleteClick(dataset: Dataset) {
    if (confirm("Are you sure you want to delete dataset: " + dataset.name)) {
      this.datasets = this.datasets.filter(d => d != dataset);
      this.datasetService.deleteDataset(dataset);
    }
  }

  checkIfListEmpty(): void {
    if (this.datasets.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("admin-dataset-organisation").length == 0;
    }, 5)
  }

  editPopUpIsClosed() {
	  this.editIsClicked = false;
    this.router.navigate(['admin']);
  }
}
