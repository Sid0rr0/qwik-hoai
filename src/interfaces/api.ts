export interface BuilderAPI {
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
  image:        Image[];
  name:         string;
  description:  string;
  type?:        string;
  videoLink?:   string;
  links?: Link[];
}

export interface Image {
  image: string;
}

export interface Link {
  link: string;
  text: string;
  linkText: string;
}

export interface Meta {
  lastPreviewUrl:     string;
  kind:               string;
  originalContentId?: string;
  winningTest?:       null;
}

export interface Variations {
}
