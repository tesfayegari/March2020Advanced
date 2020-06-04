import * as React from "react";
import styles from './FooterChat.module.scss';

import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import { IFooterChatProps, IFooterChatState } from "./IFooterChat";


export default class FooterChat extends React.Component<IFooterChatProps, IFooterChatState> {


  public componentDidMount(): void {
    addResponseMessage("Welcome to CHEMTREC chat bot!");
    addResponseMessage("How may I assist you?");
  }

  private _handleNewUserMessage = (message) => {
    console.log(`New message incoming! ${message}`);
    this.props.service.getQnaAnswer(message).then(answer => addResponseMessage(answer));
  }

  public render() {
    return (

      <div className={styles.FooterChat}>
        <Widget
          handleNewUserMessage={this._handleNewUserMessage}
          title="CHEMTREC Chat Bot"
          subtitle="This is CHEMTREC BOT, how can I help you?"
        />
      </div>
    );
  }
}