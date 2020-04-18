import * as React from 'react';
import { IMtmCarouselsProps, IMtmCarouselsState, IListItem } from './IMtmCarouselsProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Carousel } from "react-bootstrap";


export default class MtmCarousels extends React.Component<IMtmCarouselsProps, IMtmCarouselsState> {

  constructor(props: IMtmCarouselsProps) {
    super(props);
    this.state = {
      items: []
    };
    this.readListItems(this.props.title);
  }

  public componentWillReceiveProps(nextProps: IMtmCarouselsProps): void {
    console.log('New Props is ', nextProps);
    console.log('old Props is ', this.props);
    this.readListItems(nextProps.title);
  }

  private readListItems(listName) {
    this.props.spfxContext.spHttpClient.get(`${this.props.spfxContext.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=Active ne false`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
        return response.json();
      })
      .then((response: { value: IListItem[] }): void => {
        // this.updateStatus(`Successfully loaded ${response.value.length} items`, response.value);
        console.log('Data is ', response.value);
        this.setState({ items: response.value });
      }, (error: any): void => {
        //Error Occured
        console.error('Oops error occured', error);
        this.setState({ items: [] });
      });
  }

  public render(): React.ReactElement<IMtmCarouselsProps> {
    return (
      <Carousel interval={3000}>
        {this.state.items.map(item => <Carousel.Item>
          <img
            className="d-block w-100"
            src={item.ImageUrl}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{item.Title}</h3>
            <p>{item.Description}</p>
            {item.LinkUrl && <a href={item.LinkUrl} target="_blank" className="btn btn-dark">Learn More...</a>}
          </Carousel.Caption>
        </Carousel.Item>)}

      </Carousel>
    );
  }
}
