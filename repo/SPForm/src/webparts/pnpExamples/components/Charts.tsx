import * as React from 'react';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

const data: Chart.ChartData = {
  labels:
    [
      'January', 'February', 'March', 'April', 'May', 'June', 'July'
    ],
  datasets:
    [{
      label: 'My First Dataset',
      data:
        [
          65, 59, 80, 81, 56, 55, 40
        ]
    }]
};

// set the options
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
export const Bar = (props) =>
  <ChartControl
    type={ChartType.Bar}
    data={data}
    options={options}
  />
  
export const Line = (props) =>
  <ChartControl
    type={ChartType.Line}
    data={data}
    options={options}
  />