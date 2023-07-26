import type { Image } from "./api";

export interface InfoAPI {
  results: Result[];
}

export interface Result {
  lastUpdatedBy:  string;
  folders:        any[];
  data:           Data;
  modelId:        string;
  query:          any[];
  published:      string;
  firstPublished: number;
  testRatio:      number;
  lastUpdated:    number;
  createdDate:    number;
  createdBy:      string;
  meta:           Meta;
  variations:     Variations;
  name:           string;
  id:             string;
  rev:            string;
}

export interface Data {
  text: string;
  image?: Image[];
}

export interface Meta {
  kind:           string;
  lastPreviewUrl: string;
}

export interface Variations {
}
