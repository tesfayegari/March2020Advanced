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

  submitEditForm = () => {

    console.log('Update Data to be Submitted is ', SPForm.data);
    sp.web.lists.getByTitle("Sandwiches").items.getById(SPForm.data.ID).update({
      Title: SPForm.data.Title,
      unitPrice: SPForm.data.unitPrice * 1,       // allows a single lookup value
      MultiLookupId: {
        results: SPForm.data.selected // allows multiple lookup value
      }
    }).then(success => {
      console.log('Success...', success);
      this.props.onHide();
    }, error => {
      console.error('Oops error', error);
      alert('Oops error occured');
      this.props.onHide();
    });


  }

  submitNewForm = () => {

    console.log('New Data to be Submitted is ', SPForm.data);
    sp.web.lists.getByTitle("Sandwiches").items.add({
      Title: SPForm.data.Title,
      unitPrice: SPForm.data.unitPrice * 1,       // allows a single lookup value
      MultiLookupId: {
        results: SPForm.data.selected // allows multiple lookup value
      }
    }).then(success => {
      console.log('Success...', success);
      this.props.onHide();
    }, error => {
      console.error('Oops error', error);
      alert('Oops error occured');
      this.props.onHide();
    });
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
          {this.props.Type === FormType.NewForm ?
            <Button variant="primary" onClick={this.submitNewForm}>
              Submit
          </Button> : ''}
          {this.props.Type === FormType.EditForm ?
            <Button variant="primary" onClick={this.submitEditForm}>
              Update
          </Button> : ''}
        </Modal.Footer>
      </Modal>
    );
  }
}
