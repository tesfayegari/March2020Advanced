import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export enum FormType{
  NewForm=1,
  EditForm,
  DisplayForm
}

interface ModalFormProps {
  show: boolean;
  onHide: () => void;
  Title: string;
  Type: FormType;
}

export class SPModal extends React.Component<ModalFormProps, {}> {
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
          <SPForm formType={this.props.Type}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onHide}>
            {this.props.Type === FormType.NewForm ? 'Save' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const SPForm = (props) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Example select</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
        <select multiple className="form-control" id="exampleFormControlSelect2">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
      </div>
    </>
  );
}



