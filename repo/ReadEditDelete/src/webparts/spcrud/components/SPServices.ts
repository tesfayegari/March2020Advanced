import { sp } from "sp-pnp-js";
import { Option } from "./MultiLookup";

export class SPServices {
  public static readLookupItems(listName: string) {    
    sp.web.lists.getByTitle(listName)
      .items.select('Title, ID')
      .getAll()
      .then((resultItems: any[]): void => {
        console.log('Lookup is is ', resultItems);
        var ops: Option[] = [] ;
        resultItems.forEach(item => ops.push({value: item.ID, label: item.Title}));
        console.log('Options to be selected ', ops);
        
        // this.setState({options: ops, selected: this.props.selected})
      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }
}