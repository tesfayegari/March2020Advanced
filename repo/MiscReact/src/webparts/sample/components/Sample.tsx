import * as React from 'react';
import styles from './Sample.module.scss';
import { ISampleProps } from './ISampleProps';

import SPLookup, { FormType } from 'sp-lookup';

export default class Sample extends React.Component<ISampleProps, {}> {
  public render(): React.ReactElement<ISampleProps> {
    return (
      <div className={styles.sample}>
        <SPLookup
          itemId={2} //item ID is necessary when Form Type is not New Form
          lookupListName="AccordionList" //Lookup List Name, For this feature column is Title internal name
          parentListName="Sandwiches" //Parent List Name
          internalLookupName="MultiLookup" //Internal name of lookup column in Parent List
          onChange={value => console.log(value)}
          context={this.props.context}
          multi={true}
          formType={FormType.EditForm} 
          label="Select Multiple Lookups"/>
      </div>
    );
  }
}
