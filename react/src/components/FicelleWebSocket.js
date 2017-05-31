import React from 'react';
import Websocket from 'react-websocket';
import {BrowserNotification} from 'browser-notification';

export default class FicelleWebSocket extends React.Component {
  state = {
    notifier: undefined
  };

  handleData(data) {
    const data_decoded = JSON.parse(data);
    console.log(data_decoded);
    this.state.notifier.notify(`@${data_decoded.feed.title} #${data_decoded.hook.title}`, {body: data_decoded.data})
  }

  webSocketUri() {
    const loc = window.location;
    return ((loc.protocol === "https:") ? "wss:":"ws:") + "//" + loc.host;
  }


  componentDidMount() {
    this.setState({notifier: BrowserNotification()})
  }

  render() {
    return (
      <Websocket
        url={this.webSocketUri()}
        onMessage={this.handleData.bind(this)}/>
    );
  }
}