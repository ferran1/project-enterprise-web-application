import {EventEmitter, Injectable} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../models/dataset";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {error} from "util";
import {UserService} from "./user.service";
import {SpringSessionService} from "./session/spring-session.service";
import {FirebaseFileService} from "./firebase-file.service";
import {Organisation} from "../models/organisation";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private readonly REST_DATASETS_URL = "http://localhost:8080/datasets";
  private datasets: Dataset[];

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private fileService: FirebaseFileService) {
    this.datasets = [];

    this.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        this.datasets = data;
        /*this.datasets.forEach((dataset: Dataset) => {
          this.updateDataset(dataset);
        });*/
      },
      (error) => {
        console.log(error);
      },
      () => {
        // console.log("Dataset service has retrieved all datasets");
      }
    );

  }

  getAllDatasets() {
    return this.httpClient.get<Dataset[]>(this.REST_DATASETS_URL);
  }

  public getDatasets() {
    return this.datasets;
  }

  public getMyDatasets(){
    return this.datasets.filter(dataset => dataset.user.id == this.userService.getLoggedInUser().id);
  }

  public getPublicDatasets() {
    return this.datasets.filter(dataset =>
      dataset.publicity.includes("Public")
    );
  }

  getEUDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region.includes("European level")
    );
  }

  getNATDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region == "NAT_LEVEL"
    );
  }

  getURBDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region == "URB_LEVEL"
    );
  }

  detachDatasetFromOrganisation(org: Organisation){
    this.datasets.forEach(dataset => {
      if(dataset.organisations.find(o => o.id === org.id)) {
        dataset.organisations = dataset.organisations.filter(organisation => organisation.id != org.id);
        dataset.publicity = "PRIVATE";
      }
    });
  }

  //POST request to database and adds the response(dataset) to the list inside the service
  //Closingtoggle optional parameter is used to let the myuploads page know that the dataset has succesfully been saved
  // so it can close the modal. The file parameter is used to store the given file in firebase storage
  // using firebase-file service.
  saveDataset(dataset: Dataset, file: File, closingToggle?: EventEmitter<boolean>){
    if(dataset == null || undefined) return;
    let fileName = file.name.split(/\.csv|\.pdf/)[0];
    let fileType = file.type.split("/")[1];
    if (fileType === "vnd.ms-excel"){
      fileType = "csv"
    }
    dataset.fileType = fileType;
    dataset.fileName = fileName;
    return this.httpClient.post<Dataset>(this.REST_DATASETS_URL + "/upload", dataset).subscribe(
      (data) => {
        // console.log(data);
        this.datasets.push(data);
        this.fileService.saveFile(file, data.id);
      },
      error => {
        console.log(error);
      },
      () => {
        if(closingToggle) {
          closingToggle.emit(true); // Used to notify view to close modal used for uploading dataset
        }
        // console.log("Finished posting dataset");
      }
    );
  }

  public updateDataset(dataset: Dataset): boolean {
    if (!dataset) return false;
    let index: number = this.datasets.findIndex(d => d.id == dataset.id);
    this.datasets[index] = dataset;
    this.httpClient.put(this.REST_DATASETS_URL, dataset).subscribe(
      (responseDataset: Dataset) => {
        this.datasets[index] = responseDataset;
        // console.log(this.datasets[index]);
      }, error => { console.log(error); },
      () => {
        // console.log("Finished updating dataset");
      }
    );
  }

  // Deletes the dataset
  public deleteDataset(dataset: Dataset): boolean {
    this.datasets = this.datasets.filter(d =>  d.id != dataset.id);
    this.httpClient.delete(this.REST_DATASETS_URL + "/" + dataset.id).subscribe(
      (data: Dataset[]) => {
        // console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        // console.log("Finished deleting dataset: ", dataset);
      }
    );
    return this.datasets.includes(dataset);
  }

  //Adds dataset to list of datasets inside service manually, only use for developing purposes
  public addDataset(dataset: Dataset): Boolean {
    this.datasets.push(dataset);
    return this.datasets[this.datasets.length - 1].equals(dataset);
  }

  generateRandomDataset() {
    let randomID = Dataset.generateRandomID(); //Generates a random dataset id
    //Generate random year
    let year: number = Math.floor(Math.random() * (2019 - 1980)) + 1980;

    //Generates a random chart
    let chart = Dataset.generateChartDataset();
    console.log(chart);
    let chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    //Randomly selects one of the three region levels
    let regionLevels = Object.keys(RegionLevel);
    let randomPropertyName = regionLevels[Math.floor(Math.random() * 3)];
    //Randomly selects one of the three publicity options
    let publicityOptions = Object.keys(Publicity);
    let randomPublicity = publicityOptions[Math.floor(Math.random() * 3)];
    //Randomly generates a user
    let randomNumber = Math.floor(this.userService.getUsers().length * Math.random());
    let randomUser = this.userService.getUsers()[randomNumber];

    //Randomly generates a dataset name
    let datasetName = "";
    let listOfCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 7; i++) {
      datasetName += listOfCharacters.charAt(Math.floor(listOfCharacters.length * Math.random()));
    }
    return new Dataset(datasetName, RegionLevel[randomPropertyName],
      Publicity[randomPublicity], randomUser, year, chart, chartLabels,
      null, null, null, randomID);
  }

}
