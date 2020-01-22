import { Dataset } from './dataset';
import {User} from "./user";

describe('Dataset', () => {


  it('should create an instance', () => {
    let user: User = new User("test@test.nl", true);
    let dataset: Dataset = new Dataset("Test dataset",
      "NAT_LVL",
      "PUBLIC",
      user,
      new Date().getFullYear(),
      Dataset.generateChartDataset(),
      ["Testlabel 1", "Testlabel 2"],
      "testfile.csv"
      );
    expect(new Dataset(dataset.name, dataset.region, dataset.publicity, dataset.user, dataset.year, dataset.chart, dataset.chartLabels, dataset.fileName)).toBeTruthy();
  });
});
