export interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

export interface DataLine {
  labels: string[];
  datasets: Dataset[];
}
export interface LineConfig {
  type: "line";
  data: DataLine;
}
