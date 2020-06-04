import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';


import * as React from "react";
import * as ReactDom from "react-dom";
import FooterChat from "./components/FooterChat";
import { IFooterChatProps } from "./components/IFooterChat";

import * as strings from 'SpFxChatApplicationCustomizerStrings';
import { CognitiveService } from './cognitiveservices';

const LOG_SOURCE: string = 'SpFxChatApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxChatApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpFxChatApplicationCustomizer
  extends BaseApplicationCustomizer<ISpFxChatApplicationCustomizerProperties> {

  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderFooter);
    //this._renderFooter();

    return Promise.resolve();
  }

  private _renderFooter() {
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = 
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      const element: React.ReactElement<IFooterChatProps> = React.createElement(
        FooterChat, {service: new CognitiveService(this.context)});

      ReactDom.render(element, this._bottomPlaceholder.domElement);
    }
  }

  private _onDispose(): void {
    console.log('Disposed custom bottom placeholders.');
  }
}
