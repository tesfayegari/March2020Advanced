import * as React from 'react';


interface ItemReultsProps {
  items: any[];
 
}

export default class ItemReults extends React.Component<ItemReultsProps, {}> {
  render() {
    const results = this.props.items.map(item =>
      <tr key={item.Id}>
        <td>{item.Title}</td>
        <td>{item.unitPrice}</td>
        <td>
          
        </td>
      </tr>
    );
    console.log('Rendering Results', results);
    return (
      <div className="row mt-2">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Multi Lookup</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {results}
          </tbody>
        </table>
      </div>
    );
  }
}