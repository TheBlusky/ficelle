import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import {CircularProgress, MenuItem, SelectField, TextField, Toggle} from "material-ui";
import {Col, Row} from "react-flexbox-grid";

class HookEditDialog extends React.Component {
  state = {
    hook_selected_feed: undefined,
    hook_enabled: undefined,
    confirm_delete_open: false,
  };

  componentWillReceiveProps(newprops){
    if(this.props.hookEdit.loading && !newprops.hookEdit.loading) {
      this.setState({
        hook_selected_feed: newprops.hookEdit.hook.feed,
        hook_enabled: newprops.hookEdit.hook.enabled,
        confirm_delete_open: false
      });
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.hook_edit_cancel}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={() => this.setState({confirm_delete_open: true})}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={() => this.props.hook_edit_update(this.props.hookEdit.hook.id,{
          title:this.refs.hook_title.getValue(),
          feed:this.state.hook_selected_feed,
          enabled:this.state.hook_enabled,
          frequency:this.refs.hook_frequency.getValue(),
          settings:this.refs.hook_settings.getValue()
        })}
      />,
    ];

    return (
      <Dialog
        title="Edit hook"
        actions={actions}
        modal={true}
        open={this.props.hookEdit.hook_id!==false}>
        {
          this.props.hookEdit.loading
            ?
          <CircularProgress size={80} thickness={5} />
            :
          <div>

            <Row style={{"margin": "10px"}}>
              <Col lg={6} md={6} sm={6} xs={6}>
                <SelectField
                  floatingLabelText="Feed"
                  value={this.state.hook_selected_feed}
                  onChange={(event, index, value) => this.setState({hook_selected_feed: value})}>
                  {this.props.feeds.map((feed) => (
                    <MenuItem value={feed.id} key={feed.id} primaryText={feed.title}/>
                  ))}
                </SelectField>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <TextField
                  floatingLabelText="Title"
                  ref="hook_title"
                  fullWidth={true}
                  defaultValue={this.props.hookEdit.hook.title} />
              </Col>
            </Row>

            <Row style={{"margin": "10px"}}>
              <Col lg={3} md={3} sm={3} xs={3}>
                <TextField
                  disabled={true}
                  floatingLabelText="Type"
                  fullWidth={true}
                  defaultValue={this.props.hookEdit.hook.type} />
              </Col>
              <Col lg={3} md={3} sm={3} xs={3}>
                <TextField
                  floatingLabelText="Frequency"
                  ref="hook_frequency"
                  fullWidth={true}
                  defaultValue={this.props.hookEdit.hook.frequency} />
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <TextField
                  disabled={true}
                  floatingLabelText="ID"
                  fullWidth={true}
                  defaultValue={this.props.hookEdit.hook.id} />
              </Col>
            </Row>

            <Toggle
              label={this.state.hook_enabled?"Hook enabled":"Hook disabled"}
              labelPosition="right"
              onToggle={(event,isInputChecked) => {this.setState({hook_enabled: isInputChecked})}}
              defaultToggled={this.props.hookEdit.hook.enabled}
            />

            <TextField
              floatingLabelText="Settings"
              fullWidth={true}
              ref="hook_settings"
              defaultValue={this.props.hookEdit.hook.settings} />

            <TextField
              disabled={true}
              floatingLabelText="State"
              fullWidth={true}
              defaultValue={this.props.hookEdit.hook.state} />

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
                  onTouchTap={() => this.props.hook_edit_delete(this.props.hookEdit.hook.id)}
                />,
              ]}
              modal={true}
              open={this.state.confirm_delete_open}
              onRequestClose={() => this.setState({confirm_delete_open: false})}>
              Are you sure ? (all items provided by this hook will be deleted)
            </Dialog>
          </div>
        }
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hookEdit: state.ficelle.hookEdit,
    feeds: state.ficelle.feeds,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hook_edit_cancel:() => {
      dispatch({type: "HOOKEDIT_CANCEL"})
    },
    hook_edit_delete:(hook_id) => {
      dispatch({type: "HOOKEDIT_DELETE_REQUESTS", data:{hook_id}})
    },
    hook_edit_update:(hook_id, hook_data) => {
      dispatch({type: "HOOKEDIT_UPDATE_REQUESTS", data:{hook_id, hook_data}})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HookEditDialog);