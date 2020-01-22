import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {Organisation} from "./organisation";
import {User} from "./user";
import {ViewChild} from "@angular/core";

export enum RegionLevel {
  NAT_LEVEL = "National",
  EU_LEVEL = "European",
  URBAN_LEVEL = "Urban"
}

export enum Publicity {
  PUBLIC = "Public",
  PRIVATE = "Private",
  GROUP = "Group"
}

export class Dataset {
  id: number;
  name: string;
  region: string;
  publicity: string;
  organisations?: Organisation[] = [];
  description?: string;
  fileName: string;
  fileType: string;
  year: number;
  user: User;
  chart: ChartDataSets;
  chartLabels: string[];

  // chartOptions?: ChartOptions;


  constructor(name: string, region: string, publicity: string,
              user: User, year: number, chart: ChartDataSets, chartLabels: string[],
              fileName: string,
              description?: string, organisations?: Organisation[], id?: number) {
    this.name = name;
    this.region = region;
    this.publicity = publicity;
    this.year = year;
    this.user = user;
    this.chart = chart;
    this.chartLabels = chartLabels;
    if(fileName){
    this.fileName = fileName.split(".")[0];
    this.fileType = fileName.split(".")[1];
    }
    this.description = description == null ? null : description;
    this.organisations = organisations == [] ? [] : organisations;
    this.id = id;

    // this.chartOptions = chartOptions;
  }

  equals(dataset: Dataset): boolean {
    return this.id == dataset.id;
  }

  setChart(chart: ChartDataSets, chartLabels: string[]) {
    this.chartLabels = chartLabels;
    this.chart = chart;
  }

  static trueCopy(dataset: Dataset): Dataset {
    return Object.assign(new Dataset(dataset.name, dataset.region,
      dataset.publicity, dataset.user, dataset.year, dataset.chart, dataset.chartLabels, dataset.fileName), dataset);
  }

  static generateRandomID() {
    let randomId = Math.floor(Math.random() * 9999);
    return randomId;
  }

  static getEnumFromValue(value: string): string {
    switch (value) {
      case RegionLevel.EU_LEVEL: {
        return "EU_LEVEL"
      }
      case RegionLevel.URBAN_LEVEL: {
        return "URBAN_LEVEL";
      }
      case RegionLevel.NAT_LEVEL: {
        return "NAT_LEVEL"
      }
    }
  }

  static generateChartDataset(): ChartDataSets {
    let arrayNumbers: number[] = [];
    for (let i = 0; i < 6; i++) {
      let number = Math.floor(Math.random() * 3000);
      arrayNumbers.push(number);
    }
    let chartType = ["bar", "horizontalBar", "pie"];


    //console.log(randomChartType);
    let randomNumber = Math.floor(Math.random() * chartType.length - 1);
    let randomDataLabel = ["Eletricity consumption", "Solar power", "Houses"];
    return ({
      type: chartType[0],
      data: arrayNumbers,
      label: randomDataLabel[Math.floor(Math.random() * randomDataLabel.length
      )],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
    });

    /*new Chart('canvas', {
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: arrayNumbers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }]
      }
    });*/
  }

}
