import * as React from 'react';
import { IImageRendererReactProps } from './IImageRendererReactProps';


export default class ImageRendererReact extends React.Component<IImageRendererReactProps, {}> {
  public render(): React.ReactElement<IImageRendererReactProps> {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img className="card-img-top" src={this.props.imageUrl} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <p className="card-text">{this.props.description}</p>
                <a href="#" className="btn btn-primary">View More...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
