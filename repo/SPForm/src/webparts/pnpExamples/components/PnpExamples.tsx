import * as React from 'react';
import { Bar, Line } from "./Charts";
import { IPnpExamplesProps } from './IPnpExamplesProps';


export default class PnpExamples extends React.Component<IPnpExamplesProps, {}> {
  public render(): React.ReactElement<IPnpExamplesProps> {
    return (
     <div>
       <Bar />
       <br/>
       <Line />
     </div>
    );
  }
}
