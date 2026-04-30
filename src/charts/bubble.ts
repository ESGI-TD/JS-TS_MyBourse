export type Dataset = {
  label: string;
  data: BubbleData[];
  backgroundColor: string;
};

export type DataBubble = {
  datasets: Dataset[];
};

export type BubbleConfig = {
  type: "bubble";
  data: DataBubble;
  options?: {
    scales?: {
      x?: {
        title?: {
          display: boolean;
          text: string;
        };
      };
      y?: {
        title?: {
          display: boolean;
          text: string;
        };
      };
    };
  };
};

export type BubbleData = {
  x: number;
  y: number;
  r: number;
};
