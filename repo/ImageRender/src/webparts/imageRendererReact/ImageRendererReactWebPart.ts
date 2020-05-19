import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'ImageRendererReactWebPartStrings';
import ImageRendererReact from './components/ImageRendererReact';
import { IImageRendererReactProps } from './components/IImageRendererReactProps';

export interface IImageRendererReactWebPartProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default class ImageRendererReactWebPart extends BaseClientSideWebPart <IImageRendererReactWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");

    const element: React.ReactElement<IImageRendererReactProps> = React.createElement(
      ImageRendererReact,
      {
        description: this.properties.description,
        title: this.properties.title,
        imageUrl: this.properties.imageUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneTextField('imageUrl', {
                  label: 'Image URL',
                  description: 'Please go to your site asset and get the image url'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
