import React, { Component, PropTypes } from 'react';
import {Snackbar} from "material-ui";
import {connect} from "react-redux";

class FicelleSnackbar extends Component {
  state = {
    open: false
  };

  componentWillReceiveProps(newprops){
    this.setState({
      open: true,
      message_id: -1
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Snackbar
          open={this.state.open}
          message={this.props.message.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
    );
  }
}

FicelleSnackbar.propTypes = {
  message: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.ficelle.error_message,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

const ConnectedFicelleSnackbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(FicelleSnackbar);

export default ConnectedFicelleSnackbar;
