import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ItemPaginationProps {
  next: () => void;
  previous: () => void;
  pageNumber?: number;
  disableNext: boolean;
}


export default class ItemPagination extends React.Component<ItemPaginationProps, {}> {
  render() {

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${this.props.pageNumber == 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={this.props.previous}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
          </li>
          <li className="page-item disabled"><a className="page-link" href="#">{this.props.pageNumber && `Page - ${this.props.pageNumber}` }</a></li>

          <li className={`page-item ${this.props.disableNext? 'disabled' : ''}`}>
            <a className="page-link" onClick={this.props.next} href="#">
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </li>
        </ul>

      </nav>
    );
  }
}

