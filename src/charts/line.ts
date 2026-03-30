export type Dataset = {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
};

export type DataLine = {
  labels: string[];
  datasets: Dataset[];
};
export type LineConfig = {
  type: "line";
  data: DataLine;
};
