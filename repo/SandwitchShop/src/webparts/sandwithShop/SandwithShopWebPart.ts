import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'SandwithShopWebPartStrings';
import SandwithShop from './components/SandwithShop';
import { ISandwithShopProps } from './components/ISandwithShopProps';

export interface ISandwithShopWebPartProps {
  description: string;
}

export default class SandwithShopWebPart extends BaseClientSideWebPart<ISandwithShopWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
    const element: React.ReactElement<ISandwithShopProps> = React.createElement(
      SandwithShop,
      {
        description: this.properties.description       
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
