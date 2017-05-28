import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Dialog, FlatButton, TextField } from "material-ui";
import {connect} from "react-redux";


class AddFeedDialog extends Component {
  state = {
    feed_add_open: false
  };

  componentWillReceiveProps(newprops){
    // If hook_add_open is changed, popup
    if(this.props.feed_add_open < newprops.feed_add_open) {
       this.setState({feed_add_open: true});
    }

    // If a Feed creation request is performed
    if(this.props.feedCreation.loading && !newprops.feedCreation.loading){
      if(newprops.feedCreation.success) {
        // On success
        this.setState({feed_add_open: false});
        this.props.feeds_api_list();
      }
      if(!newprops.feedCreation.success){
        // On faillure
        alert('oups');
      }
    }
  }
  render() {
    return(
      <Dialog
        title="Create a new feed"
        actions={
          this.props.feedCreation.loading ? <CircularProgress /> : [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={() => {this.setState({feed_add_open: false})}} />,
            <FlatButton
              label="Create"
              primary={true}
              keyboardFocused={true}
              onTouchTap={() => { this.props.feeds_api_add(this.refs.feed_name.getValue())}} />]}
        modal={true}
        open={this.state.feed_add_open}
        onRequestClose={() => {this.setState({feed_add_open: false})}}>
        <TextField ref="feed_name" hintText="Feed name" /><br />
      </Dialog>
    )
  }

}

AddFeedDialog.propTypes = {
  feeds: PropTypes.array.isRequired,
  feedCreation: PropTypes.object.isRequired,
  feeds_api_list: PropTypes.func.isRequired,
  feeds_api_add: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    feedCreation: state.ficelle.feedCreation,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feeds_api_list:() => {
      dispatch({type: "FEED_LIST_REQUESTED"})
    },
    feeds_api_add:(title) => {
      dispatch({type: "FEED_CREATE_REQUESTED", data: {title}})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFeedDialog);