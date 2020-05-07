import * as React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { sp } from "sp-pnp-js";

import DualListBox from 'react-dual-listbox';


export interface Option {
  value: string;
  label: string;
}
interface MultiLookupPickerProps {
  onChange?: (selected: string[]) => void;
  listName: string;
  selected: string[];
}
interface MultiLookupPickerState {
  selected: string[];
  options: Option [];
}

export class MultiLookupPicker extends React.Component<MultiLookupPickerProps, MultiLookupPickerState> {
  constructor(props: MultiLookupPickerProps) {
    super(props);
    this.state = {
      selected: [],
      options: []
    };
  }

  componentDidMount () {    
    this.readItems(this.props.listName);
    const s = this.props.selected.length > 0 ? this.props.selected : this.state.selected;
    console.log('Selected is ', s);
    this.setState({selected: s});
  }

  onChange = (selected) => {
    this.setState({ selected });
    this.props.onChange(selected);
  };

  private readItems(listName: string): void {    
    sp.web.lists.getByTitle(listName)
      .items.select('*')
      .getAll()
      .then((resultItems: any[]): void => {
        console.log('Lookup is is ', resultItems);
        var ops: Option[] = [] ;
        resultItems.forEach(item => ops.push({value: item.ID, label: item.Title}));
        console.log('Options to be selected ', ops);
        
        this.setState({options: ops, selected: this.props.selected})
      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }

  render() {   

    return (
      <DualListBox
        options={this.state.options}
        selected={this.state.selected}
        onChange={this.onChange}
      />
    );
  }
}

