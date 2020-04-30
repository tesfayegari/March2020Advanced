import * as React from 'react';
import { sp } from "sp-pnp-js";
import { ISpcrudProps } from './ISpcrudProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface ISpcrudState {
  items: any[]
}

export default class Spcrud extends React.Component<ISpcrudProps, ISpcrudState> {
  constructor(props: ISpcrudProps) {
    super(props);
    this.state = {
      items: []
    };
    this.readItems(this.props.listName, this.props.pageSize);
  }

  editItem = (id) => {
    console.log('Edit clicked', id)
  }
  deleteItem = (id) => {
    console.log('Delete clicked', id)
  }

  public componentWillReceiveProps(nextProps: ISpcrudProps): void {
    this.readItems(nextProps.listName, nextProps.pageSize);
  }

  private readItems(listName: string, pageSize: string): void {
    const top = parseInt(pageSize) == 0 ? 12 : parseInt(pageSize);
    sp.web.lists.getById(listName)
      .items.select('*,MultiLookup/Title,MultiLookup/ID')
      .top(top)
      .expand("MultiLookup")
      .get()
      .then((resultItems: any[]): void => {
        console.log('Data is ', resultItems);
        this.setState({ items: resultItems });
      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }

  public render(): React.ReactElement<ISpcrudProps> {
    console.log('Rendering', this.state.items);
    const results = this.state.items.map(item =>
      <tr key={item.Id}>
        <td>{item.Title}</td>
        <td>{item.unitPrice}</td>
        <td>{item.MultiLookup.map(i =><a href={'#' + i.ID}>{i.Title}</a>)}</td>
        <td>
          <button onClick={() => this.editItem(item.Id)} className="btn btn-primary mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => this.deleteItem(item.Id)} className="btn btn-danger mr-2">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
   );
    console.log('Rendering Results', results);
    return (
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-3">
            <div className="input-group mb-3">
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="input-group mb-3">
              <input type="search" name="searchTerm" className="form-control" placeholder="Search Items ..." />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-disabled="true">
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
            </li>
            <li className="page-item disabled"><a className="page-link" href="#">Page - 1</a></li>

            <li className="page-item disabled">
              <a className="page-link" href="#">
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
