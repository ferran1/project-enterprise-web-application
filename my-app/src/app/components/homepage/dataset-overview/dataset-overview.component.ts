import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../../models/dataset";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DatasetService} from "../../../services/dataset.service";
import {SpringSessionService} from "../../../services/session/spring-session.service";
import {UserService} from "../../../services/user.service";
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-dataset-overview',
  templateUrl: './dataset-overview.component.html',
  styleUrls: ['./dataset-overview.component.css']
})
export class DatasetOverviewComponent implements OnInit {
  public CMSContent: Object;
  private datasets: Dataset[];
  private copyDatasets: Dataset[];
	public readonly componentLink = "home_overview";

  // if subscribing wants to be done in the view component
  // private datasets$: Observable<Dataset[]>;

  // private filters: {} = {regionSearch: null, publicitySearch: null};
  @ViewChild('formElement', {static: false})
  private detailForm: NgForm;

  private regionSearch: string = "";
  private publicitySearch: string = "";

  private selectedDataset: Dataset;
  private activeIndex: number;
  private searchQuery: any;
  private p: number = 1;

  constructor(private datasetService: DatasetService, private router: Router,
              private activatedRoute: ActivatedRoute, private aUserService: UserService,
              private sessionService: SpringSessionService, private cmsService: CmsService) {
    this.datasets = [];
    this.copyDatasets = [];
    this.activeIndex = null;
    this.searchQuery = '';

    this.regionSearch = "All regions";
    this.publicitySearch = "All shared";

    this.CMSContent = {
			"HOME_SEARCH": "",
			"HOME_REGION_FILTER": "",
			"HOME_PUBLICITY_FILTER": "",
			"HOME_FILTER_BUTTON": "",
			"HOME_LIST_TITLE": "",
		};
		this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  onSelection(index: number, dataset: Dataset) {
    this.activeIndex = dataset.id;
    this.selectedDataset = this.datasets.find(dataset => dataset.id == this.activeIndex);
    this.router.navigate(['detail'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
  }

  /**
   * Filter the datasets per region and/or publicity from the
   * given inputs of the select boxes.
   */
  onFilter(): void {
    if ((this.regionSearch !== "" && this.regionSearch !== null) && (this.publicitySearch !== "" && this.publicitySearch !== null)) {
      // reset the copyDatasets to the orgininal complete dataset array
      this.copyDatasets = this.datasets;

      // if 'no' filters are selected return
      if ((this.publicitySearch === "All shared" || this.publicitySearch === "Publicity") &&
        this.regionSearch === "All regions") {
        return;
        // if only region has filterable input
      } else if (this.publicitySearch === "All shared") {
        // console.log("IF2");
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.region.includes(this.regionSearch);
        });
        // if only publicity has filterable input
      } else if (this.regionSearch === "All regions") {
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.publicity.trim().toLowerCase().includes(this.publicitySearch.trim().split(' ')[0].toLowerCase());
        });
        // if both filters have filterable input
      } else {
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.region.includes(this.regionSearch) &&
            dataset.publicity.trim().toLowerCase().includes(this.publicitySearch.trim().split(' ')[0].toLowerCase());
        });
      }
      this.copyDatasets.forEach(dataset => {
        console.log("Dataset name: " + dataset.name + "\nDataset publ: " + dataset.publicity + "\nRegion lvl: " +
          dataset.region + "\n");
      });
    } else {
      this.copyDatasets = this.datasets;
    }
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.activeIndex = null;
        if (params['id']) {
          // console.log("ID IN PARAM OVERVIEW: " + params['id']);
          this.activeIndex = params['id'];
          this.router.navigate(['detail'], {
            relativeTo: this.activatedRoute,
            queryParams: {id: params['id']}
          });

        } else if (!params['id']) {
          return;
        }
      }
    );

    // subscribing in the view component
    this.datasetService.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        if (data && this.sessionService.isAuthenticated()) {
          let userEmail: string = this.sessionService.userEmail;
          data.map((dataset: Dataset) => {
            dataset && dataset.publicity.includes("PUBLIC")  || dataset.user.email == userEmail ?
              this.datasets.push(dataset) : [];
          });
        } else if (data) {
          data.map((o) => {
            o && o.publicity.includes("PUBLIC")  ? this.datasets.push(o) : []
          })
        }
        // console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        // console.log(this.datasets);
        // console.log("Retrieved all datasets");
        this.copyDatasets = this.datasets;
      }
    );

    // subscribe to get all the datasets
    /*this.datasetService.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        if (data != null && this.sessionService.userEmail != null || undefined) {
          let userEmail: String = this.sessionService.userEmail;
          data.map((o) => {
            o && o.publicity.includes("Public") || o && o.user.email == userEmail ?
              this.datasets.push(o) : [];
          });
        } else if (data != null) {
          // push each dataset to the dataset array
          data.map((o) => {
            o && o.publicity.includes("Public") ? this.datasets.push(o) : [];
          });
        }
      },
      // log the existing error to the console
      (error) => (console.log("Error: " + error)),
      // when 'complete' make a new array which is a
      // copy of the datasets array with other memory location
      () => {
        this.copyDatasets = Object.assign([], this.datasets);

      }
    );*/
  }

  setPlaceholder(event: any) {
    event.target.placeholder = this.CMSContent['HOME_SEARCH'];
  }
}
