export interface IconDatum {
  fill?: string;
  fillRule?: string;
  paths: string[];
  stroke?: string;
  strokeWidth?: string;
  viewBox: string;
}

export interface IconHashTable {
  [key: string]: IconDatum;
}
