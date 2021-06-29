export interface ISandwitch{
  Title: string;
  unitPrice: number;  
  Id: number;
}

export interface ISandwitchOrders {
  sandwitch: ISandwitch;
  quanity: number;
}       