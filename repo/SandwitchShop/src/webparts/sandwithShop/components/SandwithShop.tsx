import * as React from 'react';
import pnp, { sp } from "sp-pnp-js";
import { ISandwithShopProps } from './ISandwithShopProps';
import { ISandwitch, ISandwitchOrders } from "./Sandwitch";

interface SandwitchShopState {
  orders: ISandwitchOrders[],
  sandwitches: ISandwitch[];
  sandwitchId: number;
  quantity: number;
}

export default class SandwithShop extends React.Component<ISandwithShopProps, SandwitchShopState> {

  constructor(props: ISandwithShopProps) {
    super(props);
    this.state = {
      orders: [],
      sandwitches: [],
      sandwitchId: 0,
      quantity: 1
    }
    this.readItems('Sandwiches');
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.submitData = this.submitData.bind(this);    
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as SandwitchShopState);
  }

  add(e) {
    e.preventDefault();
    console.log('Add clicked State is', this.state);
    const sand = this.state.sandwitches.filter(s => s.Id == this.state.sandwitchId);
    if (sand.length > 0) {
      let ordrs = this.state.orders;
      ordrs.unshift({ sandwitch: sand[0], quanity: this.state.quantity * 1 });
      this.setState({ orders: ordrs, sandwitchId: 0, quantity: 1 });
    }
  }

  //remoes from the row from top
  remove(e) {
    e.preventDefault();
    console.log('Remove clicked State value', this.state);
    if (this.state.orders.length > 0) {
      let ordrs = this.state.orders;
      ordrs.pop();
      this.setState({ orders: ordrs });
    }
  }

  private readItems(listName: string): void {   
    sp.web.lists.getByTitle(listName).items.getById(1).fieldValuesAsText.get().then(data=>console.log('Data is ',data));
    sp.site.rootWeb.lists.getByTitle(listName)
      .items.select('Title', 'Id', 'unitPrice').get()
      .then((items: ISandwitch[]): void => {
        console.log('Items are ', items);
        this.setState({ sandwitches: items });
      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }

  submitData(e) {
    e.preventDefault();
    console.log('submit clicked', this.state.orders);
    let batch = pnp.sp.createBatch();

    this.state.orders.forEach(order => {
      pnp.sp.web.lists.getByTitle("SandwithOrders").items.inBatch(batch).add({
        Title: order.sandwitch.Title,
        SandwichId: order.sandwitch.Id * 1,
        quantity: order.quanity,
        // Sandwitch_x0027_s_x0020_Descript
      }).then(r => {
        console.log(r)
      });
    });

    batch.execute().then(() => {
      console.log("All done!");
      alert('Successfully Submitted');
      this.setState({ orders: [] });
    });

  }

  public render(): React.ReactElement<ISandwithShopProps> {
    console.log('State is ', this.state);
    const sandwitchOptions = this.state.sandwitches.map(s => <option key={s.Id} value={s.Id}>{s.Title}</option>);
    let totalPrice = 0;
    this.state.orders.forEach(o => totalPrice += o.quanity * o.sandwitch.unitPrice);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="sandwitchId">Select Sandwitch</label>
              <select value={this.state.sandwitchId} onChange={this.onChange} className="form-control" name="sandwitchId">
                <option disabled value="0">Select Sandwitch...</option>
                {sandwitchOptions}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input type="number" value={this.state.quantity} onChange={this.onChange} min="1" className="form-control" name="quantity" placeholder="Quantity..." />

            </div>
          </div>
        </div>
        <div className="row">
          <button type="button" onClick={this.add} name="add" className="btn btn-primary mx-2">+</button>
          <button type="button" onClick={this.remove} name="remove" className="btn btn-primary">-</button>
          <div className="col-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name of Sandwitch</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map((order, index) =>
                  <tr key={index}>
                    <td>{order.sandwitch.Title}</td>
                    <td>${order.sandwitch.unitPrice}</td>
                    <td>{order.quanity}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="row">
              <div className="col-8 p-3 mb-2 bg-primary text-white">Total Cost</div>
              <div className="col-4 p-3 mb-2 bg-light text-dark">${totalPrice.toFixed(2)}</div>
              <button className="btn btn-primary" onClick={this.submitData}>Submit</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
