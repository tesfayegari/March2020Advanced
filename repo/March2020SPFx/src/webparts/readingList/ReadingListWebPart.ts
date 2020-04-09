import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ReadingListWebPart.module.scss';


export interface IReadingListWebPartProps {
  description: string;
  slideValue: number;
  onOff: boolean;
  lists: string | string[]; // Stores the list ID(s)
}

export default class ReadingListWebPart extends BaseClientSideWebPart<IReadingListWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.readingList}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Welcome to SharePoint!</span>
                  <p class="${ styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
                  <p class="${ styles.description}">${escape(this.properties.description)}</p>
                  <a href="http://mtmconsultinggroup.com" class="${ styles.button}">
                    <span class="${ styles.label}">Learn more about MTM</span>
                  </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Reading Lists Properties"
          },
          groups: [
            {
              groupName: "Basic Information",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Webpart Title"
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
                  key: 'listPickerFieldId',
                  multiSelect: true
                }),
                PropertyPaneSlider('slideValue', {
                  label: "Max Lists",
                  min: 5,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneToggle('onOff', {
                  key: 'onOff',
                  label: 'Are you sure?',
                  onText: 'Yes',
                  offText: 'No'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
