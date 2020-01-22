import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../../models/dataset";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Papa, PapaParseModule} from "ngx-papaparse";
import {FirebaseFileService} from "../../../services/firebase-file.service";
import {DatasetService} from "../../../services/dataset.service";
import {PdfViewerComponent, PdfViewerModule} from "ng2-pdf-viewer";
import {CmsService} from 'src/app/services/cms.service';
import {CMS} from 'src/app/models/CMS';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit, OnDestroy {
  @Input() activeIndex: number;
  private CMSContent: Object;
  private originalDataset: Dataset;
  public listOfYears: number[];
  private editedDataset: Dataset;

  protected url: string; // URL for downloading the files or viewing the files in the case of PDF
  private numberOfPages: number; // Used to determine number of pages of a PDF for the view's navigation
  private pdfPageIndex: number; // PDF page index

  private queryParamSubscription: Subscription;
  private regionLevel;
  private publicityOptions;

  public readonly componentLink = "home_detail";

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private datasetService: DatasetService, private fileService: FirebaseFileService,
              private papa: Papa, private cmsService: CmsService) {
    this.originalDataset = null;
    this.editedDataset = null;
    this.regionLevel = RegionLevel;
    this.publicityOptions = Publicity;
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
    this.pdfPageIndex = 1;

    this.CMSContent = {
      "HOME_CHART_TITLE": "",
      "HOME_CHART_DOWNLOAD": "",
      "HOME_DETAIL_TITLE": "",
      "HOME_DETAIL_NAME": "",
      "HOME_DETAIL_DESC": "",
      "HOME_DETAIL_REGION": "",
      "HOME_DETAIL_PUBLICITY": "",
      "HOME_DETAIL_YEAR": "",
      "HOME_DETAIL_BY": "",
    };
    this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  protected onDownload() {
    // console.log("Downloading dataset..");

  }

  callBackFn(pdf: any) {
    // console.log(pdf['_pdfInfo']['numPages']);
    this.numberOfPages = pdf['_pdfInfo']['numPages'];
  }

  // PDF page navigation
  onPDFPageNavClick(navigationDirection: number) {
    switch (navigationDirection) {
      case 0: {
        // Checks first whether the pageIndex falls below 0 before assignment
        this.pdfPageIndex = this.pdfPageIndex-- > 0 ? 1 : this.pdfPageIndex--;
        // console.log(this.pdfPageIndex);
        return this.pdfPageIndex;
      }
      case 1: {
        // Checks first whether the pageIndex falls above total number of pages available before assignment
        this.pdfPageIndex = this.pdfPageIndex++ >= this.numberOfPages ? 1 : this.pdfPageIndex++;
        // console.log(this.pdfPageIndex);
        return this.pdfPageIndex;
      }
    }

  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const paramId = params['id'];
        // console.log(paramId);
        if (paramId) {
          if (this.datasetService.getDatasets().length === 0) {
            let datasetList;
            this.datasetService.getAllDatasets().subscribe((datasets: Dataset[]) => {
                datasetList = datasets;
              },
              (error => {
                console.log(error)
              }),
              () => {
                // console.log(datasetList);
                this.originalDataset = datasetList.find(datasets => datasets.id == paramId);
                this.editedDataset = Dataset.trueCopy(this.originalDataset);
                this.url = this.fileService.getDownloadUrl(this.editedDataset.fileName, this.editedDataset.id, this.editedDataset.fileType);
              });
            // console.log(this.originalDataset);
          } else {
            this.originalDataset = this.datasetService.getDatasets().find(dataset => dataset.id == paramId);
            this.editedDataset = Dataset.trueCopy(this.originalDataset);
            this.url = this.fileService.getDownloadUrl(this.editedDataset.fileName, this.editedDataset.id, this.editedDataset.fileType);
          }
        }
      });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }
}
