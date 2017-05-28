import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import {CircularProgress, TextField} from "material-ui";

class FeedEditDialog extends React.Component {
  state = {
    confirm_delete_open: false,
  };

  componentWillReceiveProps(newprops){
    if(this.props.feedEdit.loading && !newprops.feedEdit.loading) {
      this.setState({
        confirm_delete_open: false
      });
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.feed_edit_cancel}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={() => this.setState({confirm_delete_open: true})}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={() => this.props.feed_edit_update(this.props.feedEdit.feed.id,{
          title:this.refs.feed_title.getValue()
        })}
      />,
    ];

    return (
      <Dialog
        title="Edit feed"
        actions={actions}
        modal={true}
        open={this.props.feedEdit.feed_id!==false}>
        {
          this.props.feedEdit.loading
            ?
          <CircularProgress size={80} thickness={5} />
            :
          <div>
            <TextField
              floatingLabelText="Title"
              ref="feed_title"
              fullWidth={true}
              defaultValue={this.props.feedEdit.feed.title} />
            <Dialog
              actions={[
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onTouchTap={() => this.setState({confirm_delete_open: false})}
                />,
                <FlatButton
                  label="Delete"
                  secondary={true}
                  onTouchTap={() => this.props.feed_edit_delete(this.props.feedEdit.feed.id)}
                />,
              ]}
              modal={true}
              open={this.state.confirm_delete_open}
              onRequestClose={() => this.setState({confirm_delete_open: false})}>
              Are you sure ? (all items and all hooks associated with this feed will also be deleted)
            </Dialog>
          </div>
        }
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    feedEdit: state.ficelle.feedEdit,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feed_edit_cancel:() => {
      dispatch({type: "FEEDEDIT_CANCEL"})
    },
    feed_edit_delete:(feed_id) => {
      dispatch({type: "FEEDEDIT_DELETE_REQUESTS", data:{feed_id}})
    },
    feed_edit_update:(feed_id, feed_data) => {
      dispatch({type: "FEEDEDIT_UPDATE_REQUESTS", data:{feed_id, feed_data}})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedEditDialog);