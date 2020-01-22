import {SearchArrayNamePipe} from './search-array.pipe';
import {Dataset} from "../models/dataset";

/**
 * @author Abdul Vahip Zor
 */

describe('searchArrayPipe', () => {
  let pipe: SearchArrayNamePipe;
  let datasetArray: Dataset[];
  let testDataset1: Dataset;
  let testDataset2: Dataset;
  let testDataset3: Dataset;

  beforeEach(() => {
    pipe = new SearchArrayNamePipe();
    datasetArray = [];
    testDataset1 = new Dataset("TestDATA1", "NAT_LVL", "PUBLIC", null, 2020, null, ["label1", "label2"], "testDATA1.pdf");
    testDataset2 = new Dataset("TestDATA2", "NAT_LVL", "PRIVATE", null, 2019, null, ["label1", "label2"], "testDATA2.pdf");
    testDataset3 = new Dataset("TestDATA3", "NAT_LVL", "PUBLIC", null, 2018, null, ["label1", "label2"], "testDATA3.pdf", "description of testDataset 3");
  });

  afterEach(() => {
    pipe = null;
    datasetArray = [];
    testDataset1 = null;
    testDataset2 = null;
    testDataset3 = null;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should fallback if no data and argument is provided', () => {
    expect(pipe.transform(datasetArray, null)).toEqual([]);
  });


  it('should return array if array with data is provided without argument(s)', () => {
    datasetArray.push(testDataset1, testDataset2, testDataset3);
    let pipeResult = pipe.transform(datasetArray, [""]);
    expect(pipeResult).toEqual(datasetArray);
  });

  it('should return empty array if empty array is provided with argument(s)', () => {
    expect(pipe.transform(datasetArray, ["2019"])).toEqual([]);
  });
});
