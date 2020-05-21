import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpFormProps {
  description: string;
  context: WebPartContext;
  collectionData: any[];
}
