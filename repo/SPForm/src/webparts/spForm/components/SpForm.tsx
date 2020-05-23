import * as React from 'react';


import { ISpFormProps } from './ISpFormProps';
import SPLookup, { FormType } from 'sp-lookup';


export default class SpForm extends React.Component<ISpFormProps, {}> {
  public render(): React.ReactElement<ISpFormProps> {
    const collections =  this.props.collectionData && this.props.collectionData.map(item =>
      <div key={item.uniqueId} className="card" style={{ width: "18rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{item.firstName} {item.lastName} </li>
          <li className="list-group-item">Age: {item.age}</li>
          <li className="list-group-item">City: {item.city}</li>
          <li className="list-group-item">Signed: {item.sign.toString()}</li>
        </ul>
      </div>);
    return (
      <div className="container-fluid">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" name="title" />
        </div>
        <SPLookup
          itemId={1}
          internalLookupName="SPLookup1"
          context={this.props.context}
          lookupListName="Sandwiches"
          parentListName="SPLookupTest"
          multi={false}
          onChange={value => console.log(value)}

          formType={FormType.DisplayForm}
          async={false}
        />
        <SPLookup
          itemId={1}
          internalLookupName="Lookup2"
          context={this.props.context}
          lookupListName="City"
          parentListName="SPLookupTest"
          multi={true}
          onChange={value => console.log(value)}
          label="Lookup 2"
          formType={FormType.EditForm}
          async={true}
        />
        {collections}
      </div>
    );
  }
}
