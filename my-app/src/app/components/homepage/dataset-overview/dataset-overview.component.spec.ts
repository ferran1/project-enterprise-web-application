import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DatasetOverviewComponent} from './dataset-overview.component';
import {DatasetDetailComponent} from "../dataset-detail/dataset-detail.component";
import {RegionFiltersPipe} from "../pipes/region-filters.pipe";
import {SearchArrayNamePipe} from "../../../pipes/search-array.pipe";
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxPaginationModule} from "ngx-pagination";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Dataset} from "../../../models/dataset";
import {DatasetService} from "../../../services/dataset.service";

/**
 * Author: Mohamed Ben Ali
 * */
describe('DatasetOverviewComponent', () => {
  let datasetOverviewComponent: DatasetOverviewComponent;
  let datasetOverviewHtml: HTMLElement;
  let datasetOverviewFixture: ComponentFixture<DatasetOverviewComponent>;

  let datasetService: DatasetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetOverviewComponent, DatasetDetailComponent, RegionFiltersPipe,
        SearchArrayNamePipe],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ChartsModule,
        NgxPaginationModule, PdfViewerModule, PapaParseModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    datasetOverviewFixture = TestBed.createComponent(DatasetOverviewComponent);
    datasetOverviewComponent = datasetOverviewFixture.componentInstance;
    datasetOverviewHtml = datasetOverviewFixture.debugElement.nativeElement;
    datasetOverviewFixture.detectChanges();
    datasetService = TestBed.get(DatasetService);

  });

  it('should create', () => {
    expect(datasetOverviewComponent).toBeTruthy();
  });

  it('should have a dataset table', () => {
    datasetOverviewHtml = datasetOverviewFixture.nativeElement;
    let table: HTMLTableElement = datasetOverviewHtml.querySelector("table");
    expect(table).toBeDefined();
  });

  it("should select datasets in table rows", () => {
    let testDatasets: Dataset[] = [datasetService.generateRandomDataset(),
      datasetService.generateRandomDataset(), datasetService.generateRandomDataset()];
    // testDatasets.forEach(d => datasetService.getDatasets().push(d));
    testDatasets.forEach(d => datasetOverviewComponent['copyDatasets'].push(d));
    datasetOverviewFixture.detectChanges();
    let datasetTable: HTMLTableElement = datasetOverviewHtml.querySelector("table.table.table-bordered");

    datasetOverviewFixture.detectChanges();
    expect(datasetTable.rows.length - 2).toEqual(testDatasets.length); // -2 in order to remove 2 default rows
    let datasetItem: HTMLTableRowElement = datasetOverviewHtml.querySelector("tr.mt-auto.mb-auto");
    spyOn(datasetOverviewComponent, "onSelection");
    datasetItem.click();
    datasetOverviewFixture.detectChanges();
    expect(datasetTable.rows.item(datasetItem.rowIndex)).toBe(datasetItem);
    expect(datasetOverviewComponent.onSelection).toHaveBeenCalledWith(0, testDatasets[0]);
  });

  it("should initialize the overview with an empty search bar", () => {
    let searchBar: HTMLInputElement = datasetOverviewHtml.querySelector("div input");
    expect(searchBar).toBeTruthy();
    expect(searchBar.textContent).toBe("");
    expect(searchBar).toHaveClass("form-control");

  });

});
