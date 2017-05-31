import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Dialog, FlatButton, MenuItem, SelectField, TextField } from "material-ui";
import {connect} from "react-redux";
import Form from "react-jsonschema-form";
import {Col, Row} from "react-flexbox-grid";

class AddHookDialog extends Component {
  state = {
    hook_schema: {},
    hook_add_open: false,
    hook_selected_feed: undefined,
    hook_selected_type: undefined,
  };

  componentWillReceiveProps(newprops){
    // If hook_add_open is changed, popup
    if(this.props.hook_add_open < newprops.hook_add_open) {
       this.setState({
         hook_add_open: true,
         hook_selected_feed: undefined,
         hook_selected_type: undefined,
       });
       if(!this.props.hookTypes.loaded && !this.props.hookTypes.loading) {
         this.props.hook_api_listavailable()
       }
    }

    // If a Hook creation request is performed
    if(this.props.hookCreation.loading && !newprops.hookCreation.loading){
      if(newprops.hookCreation.success) {
        // On success
        this.setState({hook_add_open: false});
        this.props.feeds_api_list();
      }
      if(!newprops.hookCreation.success){
        // On faillure
        alert('oups');
      }
    }
  }

  render() {
    return (
      <Dialog
        title="Create a new hook"
        actions={
          (this.props.hookCreation.loading || !this.props.hookTypes.loaded ) ? <CircularProgress /> : [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={() => {
                this.setState({hook_add_open: false})
              }}/>,
            <FlatButton
              label="Create"
              primary={true}
              keyboardFocused={true}
              onTouchTap={() => {
                this.props.hooks_api_add(
                  this.refs.hook_title.getValue(),
                  this.state.hook_selected_type.type,
                  this.state.hook_selected_feed,
                  this.refs.hook_settings.getValue(),
                  this.refs.hook_frequency.getValue()
                )
              }}/>
          ]}
        modal={true}
        open={this.state.hook_add_open}
        onRequestClose={() => {
          this.setState({hook_add_open: false})
        }}>

        <Row style={{"margin": "10px"}}>
          <Col lg={6} md={6} sm={6} xs={6}>
            <SelectField
              ref="hook_feed"
              floatingLabelText="Feed"
              value={this.state.hook_selected_feed}
              onChange={(event, index, value) => this.setState({hook_selected_feed: value})}>
              {this.props.feeds.map((feed) => (
                <MenuItem value={feed.id} key={feed.id} primaryText={feed.title}/>
              ))}
            </SelectField>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6}>
            <TextField ref="hook_title" hintText="Title" floatingLabelText="Title"/>
          </Col>
        </Row>
        <Row style={{"margin": "10px"}}>
          <Col lg={6} md={6} sm={6} xs={6}>
            <SelectField
              ref="hook_type"
              floatingLabelText="Type"
              value={this.state.hook_selected_type}
              onChange={(event, index, value) => {
                this.refs.hook_frequency.getInputNode().value = value.template.frequency;
                this.refs.hook_frequency.forceUpdate();
                this.setState({
                  hook_selected_type: value,
                  hook_schema: JSON.parse(value.template.settings),
                })
              }}>
              {this.props.hookTypes.types.map((type) => (
                <MenuItem value={type} key={type.type} primaryText={type.type}/>
              ))}
            </SelectField>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6}>
            <TextField
              floatingLabelText="Frequency"
              ref="hook_frequency"
              fullWidth={true} />
          </Col>
        </Row>
        <h3>Settings</h3>
         <Form
           schema={this.state.hook_schema}
            onChange={(a)=> {this.refs.hook_settings.getInputNode().value = JSON.stringify(a.formData)}}>
           <div />
         </Form>
        <TextField
          floatingLabelText="Settings"
          fullWidth={true}
          ref="hook_settings" />
      </Dialog>
    );
  }
}

AddHookDialog.propTypes = {
  feeds: PropTypes.array.isRequired,
  feeds_api_list: PropTypes.func.isRequired,
  hookCreation: PropTypes.object.isRequired,
  hooks_api_add: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    hookCreation: state.ficelle.hookCreation,
    hookTypes: state.ficelle.hookTypes,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feeds_api_list:() => {
      dispatch({type: "FEED_LIST_REQUESTED"})
    },
    hooks_api_add:(title, type, feed, settings, frequency) => {
      dispatch({type: "HOOK_CREATE_REQUESTED", data: {title, type, feed, settings, frequency}})
    },
    hook_api_listavailable:() => {
      dispatch({type: "HOOKTYPES_LIST_REQUESTED"})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHookDialog);
