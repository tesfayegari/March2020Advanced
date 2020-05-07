import * as React from 'react';
import { sp } from "sp-pnp-js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { SPForm } from "./SPForm";

export enum FormType {
  NewForm = 1,
  EditForm,
  DisplayForm
}

interface ModalFormProps {
  show: boolean;
  onHide: () => void;
  Title: string;
  Type: FormType;
  item?: any;
}


export class SPModal extends React.Component<ModalFormProps, {}> {

  submitForm = () => {

    console.log('Data to be Submitted is ', SPForm.data);
    sp.web.lists.getByTitle("Sandwiches").items.getById(SPForm.data.ID).update({
      Title: SPForm.data.Title,
      unitPrice: SPForm.data.selected.unitPrice*1,       // allows a single lookup value
      MultiLookupId: {
        results: SPForm.data.selected // allows multiple lookup value
      }
    }).then(success => console.log('Success', success), error => console.error('Oops error', error) );
    //this.props.onHide();
  }
  render() {
    return (
      <Modal
        {...this.props}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SPForm item={this.props.item} formType={this.props.Type} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitForm}>
            {this.props.Type === FormType.NewForm ? 'Save' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
