import React from 'react';
import Websocket from 'react-websocket';
import {initNotifications, notify} from 'browser-notification';
import {connect} from "react-redux";

class FicelleWebSocket extends React.Component {
  handleData(data) {
    const data_decoded = JSON.parse(data);
    console.log(data_decoded);
    this.props.api_list();
    if(
      (this.props.filters.id === undefined) ||
      (this.props.filters.id === data_decoded.hook.id) ||
      (this.props.filters.id === data_decoded.feed.id)
    ) {
      notify(`@${data_decoded.feed.title} #${data_decoded.hook.title}`, {body: data_decoded.data})
    }
  }

  webSocketUri() {
    const loc = window.location;
    return ((loc.protocol === "https:") ? "wss:":"ws:") + "//" + loc.host;
  }


  componentDidMount() {
    initNotifications({
      ignoreFocused: true,
      timeout: 0,
      cooldown: 0,
    });
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