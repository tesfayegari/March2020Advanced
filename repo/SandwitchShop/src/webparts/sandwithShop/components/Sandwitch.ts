export interface ISandwitch{
  name: string;
  price: number;  
  id: number;
}

export interface ISandwitchOrders {
  sandwitch: ISandwitch;
  quanity: number;
}