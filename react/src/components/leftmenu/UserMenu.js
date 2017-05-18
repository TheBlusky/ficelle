import React, { Component, PropTypes } from 'react';
import {Card, CardText, CardTitle, CircularProgress, FlatButton} from "material-ui";
import {connect} from "react-redux";

class UserMenu extends Component {

  componentDidMount() {
    if(!('user' in this.props.user)) {
      this.props.api_me();
    }
  }

  render() {
    if(!('user' in this.props.user)) {
      return <CircularProgress size={80} thickness={5} />
    }
    return (
      <Card>
        <CardTitle
          title={this.props.user.user.email}
          subtitle={`
            ${this.props.feeds.length} feed${this.props.feeds.length>0?"s":""}
            -
            ${this.props.hooks.length} hook${this.props.hooks.length>0?"s":""}
          `}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <FlatButton label="Disconnect" /><br />
          <FlatButton label="Settings" />
        </CardText>
      </Card>
    )
  }
}



UserMenu.propTypes = {
  hooks: PropTypes.array.isRequired,
  feeds: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  api_me: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    hooks: state.ficelle.hooks,
    user: state.ficelle.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_me: () => {
      dispatch({type: "USER_ME_REQUESTED"})
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);