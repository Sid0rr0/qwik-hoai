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
  image: string;
  links: Link[];
  text:  string;
}

export interface Link {
  link: string;
  text: string;
  linkText: string;
}

export interface Meta {
  lastPreviewUrl: string;
  kind:           string;
}

export interface Variations {
}
