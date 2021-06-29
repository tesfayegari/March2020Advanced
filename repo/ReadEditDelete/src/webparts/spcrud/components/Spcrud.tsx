import * as React from 'react';
import { sp, PagedItemCollection } from "sp-pnp-js";
import { ISpcrudProps } from './ISpcrudProps';

import ItemHeader from "./ItemHeader";
import ItemPagination from "./ItemPagination"
import ItemReults from "./ItemResults";
import { SPModal, FormType } from "./ModalForm";

interface ISpcrudState {
  items: any[];
  modalshow: boolean;
  itemSelected: any;
  pageNumber: number;
  disableNext: boolean;
}

export default class Spcrud extends React.Component<ISpcrudProps, ISpcrudState> {
  pagination: PagedItemCollection<any>;
  previous: PagedItemCollection<any>[];
  constructor(props: ISpcrudProps) {
    super(props);
    this.state = {
      items: [],
      modalshow: false,
      itemSelected: {},
      pageNumber: 1,
      disableNext: true
    };
    this.previous = [];
    this.searchItems = this.searchItems.bind(this);
  }

  componentDidMount() {
    this.readItems(this.props.listName, this.props.pageSize);
  }

  public componentWillReceiveProps(nextProps: ISpcrudProps): void {
    this.readItems(nextProps.listName, nextProps.pageSize);
  }

  editItem = (id) => {
    console.log('Edit clicked', id);
    const selected = this.state.items.filter(item => item.Id == id);
    console.log('Item Selected is ', selected);
    this.setState({ modalshow: true, itemSelected: selected[0] });
  }

  itemUpdated = () => {
    this.setState({ modalshow: false });
    this.searchAllItems('');
  }

  deleteItem = (id) => {
    console.log('Delete clicked', id);
    if (confirm(`Are you sure you want to delete item ID ${id}`)) {
      sp.web.lists.getById(this.props.listName).items.getById(id).delete()
        .then(success => {
          console.log('Item deleted', success);
          this.searchItems('');
        }, error => console.error(error));
    }
  }
  searchItems = (query: string) => {
    console.log('Searching... ', query);
    this.searchAllItems(query);
  }

  private readItemsold(listName: string, pageSize: string): void {
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
  private readItems(listName: string, pageSize: string): void {
    const top = parseInt(pageSize) == 0 ? 12 : parseInt(pageSize);
    sp.web.lists.getById(listName)
      .items.select('*,MultiLookup/Title,MultiLookup/ID')
      .top(top)
      .expand("MultiLookup")
      .getPaged()
      .then((resultItems): void => {
        console.log('Data is ', resultItems);
        this.setState({ items: resultItems.results, disableNext: !resultItems.hasNext });
        this.pagination = resultItems;

      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }
  private searchAllItems(query: String): void {
    if (query == '') {
      this.readItems(this.props.listName, this.props.pageSize);
      return;
    }
    const top = parseInt(this.props.pageSize) == 0 ? 12 : parseInt(this.props.pageSize);
    sp.web.lists.getById(this.props.listName)
      .items.select('*,MultiLookup/Title,MultiLookup/ID')
      .filter(`substringof('${query}',Title)`)
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

  onPrevious = () => {
    console.log('Previous clicked');
    this.setState({ pageNumber: this.state.pageNumber - 1 });
    if (this.state.pageNumber == this.previous.length + 1)
      this.previous.pop()
    this.pagination = this.previous.pop();
    this.pagination ? this._handlePagination() : this.searchItems('');
  }
  onNext = () => {
    console.log('Next clicked');
    this.previous.push(this.pagination);
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    this._handlePagination();

  }

  private _handlePagination() {
    this.pagination.hasNext && this.pagination.getNext()
      .then((resultItems): void => {
        console.log('Data is ', resultItems);
        this.setState({ items: resultItems.results, disableNext: !resultItems.hasNext });
        this.pagination = resultItems;

      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }

  public render(): React.ReactElement<ISpcrudProps> {
    console.log('Rendering', this.state.items);
    return (
      <div className="container-fluid pt-2">
        <ItemHeader searchItems={this.searchItems} />
        <ItemReults items={this.state.items}  />
        <ItemPagination next={() => this.onNext()}
          previous={this.onPrevious}
          pageNumber={this.state.pageNumber}
          disableNext={this.state.disableNext} />
        <SPModal
          Type={FormType.EditForm}
          item={this.state.itemSelected}
          Title="Edit Sandwitch"
          show={this.state.modalshow}
          onHide={this.itemUpdated}
        />
      </div>
    );
  }
}
