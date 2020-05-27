import * as React from 'react';
import { sp } from "@pnp/sp/presets/all";
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { IMtmChartsProps } from './IMtmChartsProps';

interface IMtmChartsState {
  items: any[];
  dataPie: Chart.ChartData;
  dataBar: Chart.ChartData;
}

export default class MtmCharts extends React.Component<IMtmChartsProps, IMtmChartsState> {

  constructor(props: IMtmChartsProps) {
    super(props);
    this.state = {
      items: [],
      dataPie: undefined,
      dataBar: undefined,
    }
    this.readItems(this.props.listName);
  }

  componentDidMount() {
    this.readItems(this.props.listName);
    //this.componentWillReceiveProps(this.props);
  }

  public componentWillReceiveProps(nextProps: IMtmChartsProps): void {
    nextProps.listName && this.readItems(nextProps.listName);
  }

  private readItems(listName: string): void {
    sp.web.lists.getByTitle(listName)
      .items.select('OfficeLocation', 'Id')
      .orderBy('OfficeLocation')
      .top(300)
      .get()
      .then((items: any[]): void => {
        console.log('Data is ', items);
        this.formatListData(items);
      }, (error: any): void => {
        console.error(error);
        this.setState({ items: [] });
      });
  }

  private formatListData(items: any[], columnName: string = 'OfficeLocation') {
    let prevLocation;
    let dataCollection = []
    let temp = [];
    if (items.length > 0) {
      prevLocation = items[0].OfficeLocation;
    }

    items.forEach(item => {
      if (item.OfficeLocation == prevLocation) {
        temp.push(item);
      } else {
        dataCollection.push({ Location: prevLocation, Data: temp });
        temp = [item];
        prevLocation = item.OfficeLocation;
      }
    });
    items.length > 0 && dataCollection.push({ Location: prevLocation, Data: temp });
    console.log('Formatted data is ', dataCollection);
    // items: dataCollection });
    this.getData(dataCollection);
  }

  private getOptions() {
    const options: Chart.ChartOptions = {
      scales:
      {
        yAxes:
          [
            {
              ticks:
              {
                beginAtZero: true
              }
            }
          ]
      }
    };
    return options;
  }

  private getData(items: any[]) {
    let chtLabel = [];
    let chtData = [];

    items.forEach(emp => {
      chtLabel.push(emp.Location);
      chtData.push(emp.Data.length);
    })

    // set the data for Pie
    const dataPie: Chart.ChartData = {
      labels: chtLabel,
      datasets:
        [{
          label: this.props.description,
          data: chtData,
          borderWidth: 1
        }]
    };
    // set the data for Bar
    const dataBar: Chart.ChartData = {
      labels: chtLabel,
      datasets:
        [{
          label: this.props.description,
          data: chtData,
          backgroundColor: this.props.color ? this.props.color : 'rgba(255, 99, 132, 0.2)',
          borderColor: this.props.color ? this.props.color : 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
    };

    this.setState({ dataPie: dataPie, dataBar: dataBar, items: items })
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IMtmChartsProps> {

    const option = this.getOptions();
    return (
      <>
        {!this.props.listName &&
          <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure} />}
        {this.props.listName && <div>
          {this.props.enableBar && <ChartControl
            type={ChartType.Bar}
            data={this.state.dataBar}
            options={option}
          />}
          {this.props.enableLine && <ChartControl
            type={ChartType.Line}
            data={this.state.dataBar}
            options={option}
          />}

          {this.props.enableDonut && <ChartControl
            type={ChartType.Doughnut}
            data={this.state.dataPie}
            options={
              {
                legend: {
                  display: true,
                  position: "right"
                },
                title: {
                  display: true,
                  text: this.props.description
                }
              }
            }
          />}
          {this.props.enablePie && <ChartControl
            type={ChartType.Pie}
            data={this.state.dataPie}
            options={
              {
                legend: {
                  display: true,
                  position: "right"
                },
                title: {
                  display: true,
                  text: this.props.description
                }
              }
            }
          />}
        </div>}
      </>
    );
  }
}
