import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DatasetService} from "../../services/dataset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Dataset, Publicity, RegionLevel} from "../../models/dataset";

@Component({
  selector: 'app-view-metadata',
  templateUrl: './view-metadata.component.html',
  styleUrls: ['./view-metadata.component.css']
})
export class ViewMetadataComponent implements OnInit {

  private queryParams: Subscription;
  private viewingDataset: Dataset;
  protected regionLevels = RegionLevel;
  protected publicityLevels = Publicity;
  @Output() private closingToggle: EventEmitter<boolean>;
  private closed: boolean;

  constructor(private datasetService: DatasetService, private route: ActivatedRoute, private router: Router) {
    this.closingToggle = new EventEmitter<boolean>();
  }

  onClose() {
    this.queryParams.unsubscribe();
    this.closingToggle.emit(true);
    this.router.navigate(['./'], {
      relativeTo: this.route
    });
  }


  ngOnInit() {
    // console.log("IS INITED");
    this.queryParams = this.route.queryParams.subscribe(
      (params) => {
        let id: number = params.id;
        this.viewingDataset = this.datasetService.getDatasets().find(dataset => dataset.id == id);
      }
    );
  }
}
