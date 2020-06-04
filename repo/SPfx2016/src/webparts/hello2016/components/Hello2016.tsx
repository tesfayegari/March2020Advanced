import * as React from 'react';
import { IHello2016Props } from './IHello2016Props';
export default class Hello2016 extends React.Component < IHello2016Props, {} > {
  public render(): React.ReactElement<IHello2016Props> {
    return(
      <div>
        <h1>This is Fana's first 2016 Webpart</h1>
        <h3>{this.props.description}</h3>
      </div>
    );
  }
}
