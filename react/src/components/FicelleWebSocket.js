import React from 'react';
import Websocket from 'react-websocket';

export default class FicelleWebSocket extends React.Component {


  handleData(data) {
    const data_decoded = JSON.parse(data);
    console.log(data_decoded)
  }

  webSocketUri() {
    const loc = window.location;
    return ((loc.protocol === "https:") ? "wss:":"ws:") + "//" + loc.host;
  }

  render() {
    return (
      <Websocket
        url={this.webSocketUri()}
        onMessage={this.handleData.bind(this)}/>
    );
  }
}