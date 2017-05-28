import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item";
import {connect} from "react-redux";
import Notification from 'react-web-notification';

class Feed extends Component {
  state = {
    doNotification: false,
    gotNotif: false,
    notificationOptions: {}
  };

  componentDidMount() {
    if(this.props.items.lastUpdate===0) {
      this.props.api_list();
    }
  }

  componentWillReceiveProps(newprops){
    if(newprops.items.newItems.length > 0 && newprops.items.lastUpdate > 1) {
      newprops.items.newItems.map((item) => {
        this.setState({
          gotNotif: true,
          notificationOptions: {
            body: item.data,
          }
        });
        return 1;
      })
    }
  }

  render() {
    return (
      <div>
        <Notification
          ignore={!(this.state.doNotification && this.state.gotNotif)}
          onPermissionGranted={() => {this.setState({doNotification: true})}}
          onPermissionDenied={() => {this.setState({doNotification: false})}}
          timeout={60000}
          title="Ficelle"
          options={this.state.notificationOptions} />

        {this.props.items.items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    )
  }
}

Feed.propTypes = {
  items: PropTypes.object.isRequired,
  api_list: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.ficelle.items,
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
)(Feed);