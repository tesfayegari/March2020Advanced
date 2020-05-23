import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";

import * as strings from 'MtmChartsWebPartStrings';
import MtmCharts from './components/MtmCharts';
import { IMtmChartsProps } from './components/IMtmChartsProps';

export interface IMtmChartsWebPartProps {
  description: string;
  listName: string;
  enableBar: boolean;
  enablePie: boolean;
  enableDonut: boolean;
  enableLine: boolean;
}

export default class MtmChartsWebPart extends BaseClientSideWebPart<IMtmChartsWebPartProps> {

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error?: any) => void): void => {
      sp.setup({
        sp: {
          headers: {
            "Accept": "application/json; odata=nometadata"
          }
        }
      });
      resolve();
    });
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
    const element: React.ReactElement<IMtmChartsProps> = React.createElement(
      MtmCharts,
      {
        ...this.properties
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
                  label: 'Title'
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name'
                }),
                PropertyPaneToggle('enableBar', {
                  label: 'Enable Bar Chart',
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneToggle('enablePie', {
                  label: 'Enable Pie Chart',
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneToggle('enableLine', {
                  label: 'Enable Line Chart',
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneToggle('enableDonut', {
                  label: 'Enable Donut Chart',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
