import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SPModal, FormType } from "./ModalForm";
interface ItemheaderState {
  searchTerm: string;
  modalshow: boolean;
}

interface ItemheaderProps {
  searchItems: (searchQuery: string) => void;
}

export default class Itemheader extends React.Component<ItemheaderProps, ItemheaderState> {
  constructor(props: ItemheaderProps) {
    super(props);
    this.state = {
      searchTerm: '',
      modalshow: false
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  setModalShow = (show: boolean) => {
    this.setState({ modalshow: show });
    if(!show){this.props.searchItems(this.state.searchTerm);}
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="input-group mb-3">
            <button onClick={() => this.setModalShow(true)} className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="input-group mb-3">
            <input type="search" value={this.state.searchTerm} onChange={this.onChange} name="searchTerm" className="form-control" placeholder="Search Items ..." />
            <div className="input-group-append">
              <button onClick={() => this.props.searchItems(this.state.searchTerm)} className="btn btn-outline-secondary" type="button" >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="w-100"></div>
        <SPModal
          Type = {FormType.NewForm}
          Title="Add New Sandwitch"
          show={this.state.modalshow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    );
  }
}