import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle, CircularProgress, FlatButton} from "material-ui";
import {connect} from "react-redux";

class UserMenu extends Component {

  componentDidMount() {
    if(!('user' in this.props.user)) {
      this.props.api_me();
    }
  }

  getHookCount(feeds) {
    let result = 0;
    feeds.map(feed => (result+=feed.hook_set.length));
    return result;
  }

  render() {
    if(!('user' in this.props.user)) {
      return (
        <Card>
        <CardText>
          <CircularProgress size={80} thickness={5} />
        </CardText>
      </Card>)
    }
    return (
      <Card>
        <CardTitle
          title={this.props.user.user.email}
          subtitle={`
            ${this.props.feeds.length} feed${this.props.feeds.length>0?"s":""}
            -
            ${this.getHookCount(this.props.feeds)} hook${this.getHookCount(this.props.feeds)>0?"s":""}
          `}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <FlatButton label="Disconnect" onTouchTap={this.props.api_logout} /><br />
          <FlatButton label="Settings" />
        </CardText>
      </Card>
    )
  }
}



UserMenu.propTypes = {
  feeds: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  api_me: PropTypes.func.isRequired,
  api_logout: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    user: state.ficelle.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_me: () => {
      dispatch({type: "USER_ME_REQUESTED"})
    },
    api_logout: () => {
      dispatch({type: "USER_LOGOUT_REQUESTED"})
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);