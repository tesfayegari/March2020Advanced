import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default class ItemPagination extends React.Component {
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-disabled="true">
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
          </li>
          <li className="page-item disabled"><a className="page-link" href="#">Page - 1</a></li>

          <li className="page-item disabled">
            <a className="page-link" href="#">
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}