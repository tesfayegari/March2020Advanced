import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IImageRenderWebPartProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default class ImageRenderWebPart extends BaseClientSideWebPart <IImageRenderWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");

    this.domElement.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${this.properties.imageUrl}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${this.properties.title}</h5>
              <p class="card-text">${this.properties.description}</p>
              <a href="#" class="btn btn-primary">View More...</a>
            </div>
          </div>
        </div>
      </div>
    </div>
          `;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: 'Image Renderer Config'
        },
        groups: [
          {
            groupName: 'General Settings',
            groupFields: [
              PropertyPaneTextField('title', {
                label: 'Title'
              }),
              PropertyPaneTextField('description', {
                label: 'Description'
              }),
              PropertyPaneTextField('imageUrl', {
                label: 'Image URL'
              }),
            ]
          }
        ]
      }
    ]
  };
}
}
