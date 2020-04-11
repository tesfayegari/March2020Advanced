import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy
} from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IReadingListWebPartProps {
  description: string;
  slideValue: number;
  onOff: boolean;
  lists: string | string[]; // Stores the list ID(s)
}

interface List {
  Title: string;
  ItemCount: number;
}

export default class ReadingListWebPart extends BaseClientSideWebPart<IReadingListWebPartProps> {

  public render(): void {
    //_api/web/lists?$filter=Hidden eq false&$select=Title,ItemCount&$top=3
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
    this.domElement.innerHTML = `
    <h1>All Lists you you have under your site</h1>
    <div class="list-group list-group-flush" id="restData">
      
    </div>
        `;
    this.readLists();
  }

  private readLists() {
    //this.context.spHttpClient.get()
    this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false&$select=Title,ItemCount&$top=${this.properties.slideValue}`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse): Promise<{ value: List[] }> => {
        return response.json();
      })
      .then((response: { value: List[] }): void => {
        this.updateStatus(`Successfully loaded ${response.value.length} items`, response.value);
      }, (error: any): void => {
        this.updateStatus('Loading all items failed with error: ' + error);
      });
  }
  private updateStatus(status: string, items: List[] = []): void {
    //this.domElement.querySelector('.status').innerHTML = status;
    this.updateItemsHtml(items);
  }

  private updateItemsHtml(items: List[]): void {
    console.log('Lists are ', items);
    // let listHtml = '';
    // for(let list of items){
    //   listHtml += `
    //   <a href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
    //     ${list.Title}<span class="badge badge-primary badge-pill">${list.ItemCount}</span>
    //   </a>`;
    // }
    // this.domElement.querySelector('#restData').innerHTML = listHtml;
    this.domElement.querySelector('#restData').innerHTML = items.map(item => `<a href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                  ${item.Title}<span class="badge badge-primary badge-pill">${item.ItemCount}</span>
                </a>`).join("");
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
                  key: 'listPickerFieldId'
                }),
                PropertyPaneSlider('slideValue', {
                  label: "Max Lists",
                  min: 5,
                  max: 50,
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
