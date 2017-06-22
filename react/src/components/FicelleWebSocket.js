import React from 'react';
import Websocket from 'react-websocket';
import {BrowserNotification} from 'browser-notification';
import {connect} from "react-redux";

class FicelleWebSocket extends React.Component {
  state = {
    notifier: undefined
  };

  handleData(data) {
    const data_decoded = JSON.parse(data);
    console.log(data_decoded);
    this.props.api_list();
    if(
      (this.props.filters.id === undefined) ||
      (this.props.filters.id === data_decoded.hook.id) ||
      (this.props.filters.id === data_decoded.feed.id)
    ) {
      this.state.notifier.notify(`@${data_decoded.feed.title} #${data_decoded.hook.title}`, {body: data_decoded.data})
    }
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

const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.ficelle.filters,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_list:() => {
      dispatch({type: "ITEM_LIST_REQUESTED"})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FicelleWebSocket);