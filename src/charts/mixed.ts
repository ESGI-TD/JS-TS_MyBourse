export type MixedDataset = {
  type: "bar" | "line";
  label: string;
  data: number[];
  yAxisID: "y" | "y1";
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  tension?: number;
  order?: number;
};

export type DataMixed = {
  labels: string[];
  datasets: MixedDataset[];
};

export type MixedConfig = {
  data: DataMixed;
  options?: {
    scales?: {
      y?: {
        title?: {
          display: boolean;
          text: string;
        };
      };
      y1?: {
        position?: "left" | "right";
        grid?: {
          drawOnChartArea?: boolean;
        };
        title?: {
          display: boolean;
          text: string;
        };
      };
    };
  };
};
