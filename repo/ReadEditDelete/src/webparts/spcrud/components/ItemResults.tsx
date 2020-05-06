import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ItemReultsProps {
  items: any[];
  editItem: (id) => void;
  deleteItem: (id) => void;
}

export default class ItemReults extends React.Component<ItemReultsProps, {}> {
  render() {
    const results = this.props.items.map(item =>
      <tr key={item.Id}>
        <td>{item.Title}</td>
        <td>{item.unitPrice}</td>
        <td>{item.MultiLookup.map(i => <a href={'#' + i.ID}>{i.Title}</a>)}</td>
        <td>
          <button onClick={() => this.props.editItem(item.Id)} className="btn btn-primary mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => this.props.deleteItem(item.Id)} className="btn btn-danger mr-2">
            <FontAwesomeIcon icon={faTrash} />
          </button>
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