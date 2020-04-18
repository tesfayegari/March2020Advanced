import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMtmCarouselsProps {
  title: string;
  spfxContext: WebPartContext;
}

export interface IListItem {
  Title: string;
  Description: string;
  LinkUrl: string;
  ImageUrl: string;
}

export interface IMtmCarouselsState{
  items: IListItem[];
  
}

