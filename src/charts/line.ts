export type Dataset = {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  pointHoverRadius: number;
  tension: number;
};

export type DataLine = {
  labels: string[];
  datasets: Dataset[];
};

export type Interaction = {
  mode: string;
  intersect: boolean;
};

export type LineOptions = {
  interaction: Interaction;
};

export type LineConfig = {
  type: "line";
  data: DataLine;
  options: LineOptions;
};
