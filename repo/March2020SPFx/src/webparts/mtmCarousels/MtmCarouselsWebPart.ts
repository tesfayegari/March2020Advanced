import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import MtmCarousels from './components/MtmCarousels';
import { IMtmCarouselsProps } from './components/IMtmCarouselsProps';

export interface IMtmCarouselsWebPartProps {
  listName: string;
}

export default class MtmCarouselsWebPart extends BaseClientSideWebPart <IMtmCarouselsWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');

    const element: React.ReactElement<IMtmCarouselsProps> = React.createElement(
      MtmCarousels,
      {
        title: this.properties.listName, 
        spfxContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }  

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
            description: 'Carousels Configuration'
          },
          groups: [
            {
              groupName: 'General Properties',
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: 'List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
