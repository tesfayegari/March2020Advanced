import * as React from 'react';
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
      sandwitches: [
        { name: 'Chicken Sandwitch', price: 5.44, id: 1 },
        { name: 'Chicken Sandwitch 1', price: 8, id: 2 },
        { name: 'Chicken Sandwitch 2', price: 7.22, id: 3 },
      ],
      sandwitchId: 0,
      quantity: 1
    }
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
    console.log('Add clicked');
    const sand = this.state.sandwitches.filter(s => s.id == this.state.sandwitchId);
    if (sand.length > 0) {
      let ordrs = this.state.orders;
      ordrs.push({ sandwitch: sand[0], quanity: this.state.quantity * 1 });
      this.setState({ orders: ordrs });
    }
  }

  //remoes from the row from top
  remove(e) {
    e.preventDefault();
    console.log('Remove clicked');
    if (this.state.orders.length > 0) {
      let ordrs = this.state.orders;
      ordrs.pop();
      this.setState({ orders: ordrs });
    }
  }

  submitData(e) {
    e.preventDefault();
    console.log('submit clicked', this.state.orders);
    /**
     * 
      let batch = pnp.sp.createBatch();
      pnp.sp.web.lists.getByTitle("Orders").items.inBatch(batch).add({
          Title: "Order Title" //Other metadata from this.state.orders list
      }).then(r => {
          console.log(r)
      });

      pnp.sp.web.lists.getByTitle("Tasks").items.inBatch(batch).add({
          Title: "Order Title 2" //Other metadata from this.state.orders list
      }).then(r => {
          console.log(r)
      });
      batch.execute().then(() => console.log("All done!"));
     */
  }

  public render(): React.ReactElement<ISandwithShopProps> {
    console.log('State is ', this.state);
    const sandwitchOptions = this.state.sandwitches.map(s => <option key={s.id} value={s.id}>{s.name}</option>);
    let totalPrice = 0;
    this.state.orders.forEach(o => totalPrice += o.quanity * o.sandwitch.price);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="sandwitchId">Example select</label>
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
                {this.state.orders.map(order => <tr>
                  <td>{order.sandwitch.name}</td>
                  <td>{order.sandwitch.price}</td>
                  <td>{order.quanity}</td>
                </tr>)}
              </tbody>
            </table>
            <div className="row">
              <div className="col-8 p-3 mb-2 bg-primary text-white">Total Cost</div>
              <div className="col-4 p-3 mb-2 bg-light text-dark">{totalPrice}</div>
              <button className="btn btn-primary" onClick={this.submitData}>Submit</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
