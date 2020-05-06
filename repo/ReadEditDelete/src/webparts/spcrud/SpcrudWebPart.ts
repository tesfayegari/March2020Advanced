import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';


import Spcrud from './components/Spcrud';
import { ISpcrudProps } from './components/ISpcrudProps';

export interface ISpcrudWebPartProps {
  description: string;
  pageSize: string;
  lists: string; // Stores the list ID(s)
}

export default class SpcrudWebPart extends BaseClientSideWebPart <ISpcrudWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
    const element: React.ReactElement<ISpcrudProps> = React.createElement(
      Spcrud,
      {
        description: this.properties.description,
        listName: this.properties.lists,
        pageSize: this.properties.pageSize 
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
            description: 'SP List CRUD Config'
          },
          groups: [
            {
              groupName: 'General Config',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Name'
                }),
                PropertyPaneTextField('pageSize', {
                  label: 'Page Size'                  
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
