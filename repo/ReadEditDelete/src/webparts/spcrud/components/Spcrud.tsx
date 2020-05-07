import * as React from 'react';
import { sp } from "sp-pnp-js";
import { ISpcrudProps } from './ISpcrudProps';

import ItemHeader from "./ItemHeader";
import ItemPagination from "./ItemPagination"
import ItemReults from "./ItemResults";
import { SPModal, FormType } from "./ModalForm";

interface ISpcrudState {
  items: any[];
  modalshow: boolean;
  itemSelected: any;
}

export default class Spcrud extends React.Component<ISpcrudProps, ISpcrudState> {
  constructor(props: ISpcrudProps) {
    super(props);
    this.state = {
      items: [],
      modalshow: false,
      itemSelected: {}
    };
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
  deleteItem = (id) => {
    console.log('Delete clicked', id)
  }
  searchItems = (query: string) => {
    console.log('Searching... ', query);
    this.searchAllItems(query);
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

  public render(): React.ReactElement<ISpcrudProps> {
    console.log('Rendering', this.state.items);
    return (
      <div className="container-fluid pt-2">
        <ItemHeader searchItems={this.searchItems} />
        <ItemReults items={this.state.items} deleteItem={this.deleteItem} editItem={this.editItem} />
        <ItemPagination />
        <SPModal
          Type={FormType.EditForm}
          item={this.state.itemSelected}
          Title="Edit Sandwitch"
          show={this.state.modalshow}
          onHide={() => this.setState({modalshow: false})}
        />
      </div>
    );
  }
}
