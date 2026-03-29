export interface StockHistory {
  date: string;
  price: number;
  volume: number;
}

export interface Stock {
  currency: string;
  currentPrice: number;
  history: StockHistory[];
  name: string;
  sector: string;
  symbol: string;
}
