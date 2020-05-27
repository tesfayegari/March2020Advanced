import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMtmChartsProps {
  description: string;
  listName: string;
  enableBar: boolean;
  enablePie: boolean;
  enableDonut: boolean;
  enableLine: boolean;
  color: string;
  context: WebPartContext;
}
