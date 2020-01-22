import {Injectable, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dataset, Publicity, RegionLevel} from "../models/dataset";
import * as firebase from "firebase";
import {FbUserService} from "./fb-user.service";
import {FirebaseFileService} from "./firebase-file.service";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasetService {
  private datasets: Dataset[];
  private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com/';
  private readonly DB_DATASETS = this.DB_URL + 'Datasets';

  constructor(private httpClient: HttpClient, private userService: FbUserService,
              private fileService: FirebaseFileService) {
    this.userService.getAllUsers();
    this.getAllDatasets();
    this.datasets = [];

    /*setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      console.log(this.userService.getUsers().length);
      this.datasets.push(this.generateRandomDataset())
    }
    console.log(this.datasets);
    this.saveAllDatasets();}, 5000);*/

  }

  //Function getUploaded datasets
  // returns datasets uploaded by user

  getDatasets(): Dataset[] {
    return this.datasets;
  }

  updateDataset(index: number, dataset: Dataset): boolean {
    this.datasets[index] = dataset;
    this.datasets.forEach(dataset => {
      console.log(dataset);
    });
    this.saveAllDatasets();
    return true;
  }

  remove(selectedDataset: Dataset): boolean {
    this.datasets = this.datasets.filter(dataset =>
      dataset.id != selectedDataset.id
    );
    this.fileService.deleteFile(selectedDataset);
    this.saveAllDatasets();
    return true;
  }

  add(dataset: Dataset): boolean {
    this.datasets.push(dataset);
    this.saveAllDatasets();
    return true;
  }

  saveAllDatasets() {
    console.log(this.datasets);
    return this.httpClient.put<Dataset[]>(this.DB_DATASETS + '.json', this.datasets).subscribe(
      () => {
        console.log(this.datasets);
      },
      error => console.log(error),
      () => {
        console.log("Datasets saved");
      }
    );
  }

  getAllDatasets() {
    // return this.httpClient.get<Dataset[]>(this.DB_DATASETS);
    return this.httpClient.get<Dataset[]>(this.DB_DATASETS + '.json').subscribe(
      (data: Dataset[]) => {
        if (data != null) {
          data.map((o) => {
            o ? this.datasets.push(o) : []
          });
        }
      }
    );
  }

  getAllDatasets2() {
    // return this.httpClient.get<Dataset[]>(this.DB_DATASETS);
    return this.httpClient.get<Dataset[]>(this.DB_DATASETS + '.json');
  }


  getMyDatasets() {
    let user = this.userService.getLoggedInUser();
    return this.getDatasets().filter(dataset =>
      dataset.user.id == user.id
    );
  }

  getPrivateDatasets() {
    return this.getDatasets().filter(dataset =>
      dataset.publicity.includes("Private")
    );
  }

  getPublicDatasets() {
    return this.getDatasets().filter(dataset =>
      dataset.publicity.includes("Public")
    );
  }

  getGroupDatasets(): Dataset[] {
    return this.getDatasets().filter(dataset => {
      return dataset.publicity.toLowerCase().trim().includes("Group".toLowerCase().trim());
    })
  }

  getEUDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region.includes("European")
    );
  }

  getNATDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region.includes("National")
    );
  }

  getURBDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region.includes("Urban")
    );
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
      Publicity[randomPublicity], randomUser, year, chart, chartLabels, null, null, null,
      randomID);
  }

  ngOnInit() {
    let firebaseConfig = {
      apiKey: "AIzaSyCihkANi0RepQRSxrqVV6N2GZ9hkgico8A",
      authDomain: "projectewa-a2355.firebaseapp.com",
      databaseURL: "https://projectewa-a2355.firebaseio.com",
      projectId: "projectewa-a2355",
      storageBucket: "projectewa-a2355.appspot.com",
      messagingSenderId: "115134291690",
      appId: "1:115134291690:web:9ea9338d1a34eef2308193",
      measurementId: "G-JYBDHXR76P"
    };
    firebase.initializeApp(firebaseConfig);
  }

  public deleteDataset(dataset: Dataset): void {
    let index = this.datasets.indexOf(dataset);
    this.datasets = this.datasets.filter(data => {
      return data.id != dataset.id
    });
    this.httpClient.delete<Dataset>(this.DB_DATASETS + '/' + index + '.json').subscribe(
      (data) => {
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );


  }

}
