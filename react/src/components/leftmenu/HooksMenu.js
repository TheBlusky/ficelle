import React, { Component, PropTypes } from 'react';
import {
  Card, CardText, CardTitle, CircularProgress, Dialog, FlatButton, FloatingActionButton, List, ListItem, MenuItem,
  SelectField,
  TextField
} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {connect} from "react-redux";
import {ActionDelete} from "material-ui/svg-icons/index";

class HooksMenu extends Component {
  state = {
    add_open: false,
    show_delete: false,
    selected_feed: undefined,
  };

  handleFeedChange = (event, index, value) => this.setState({selected_feed: value});

  componentWillReceiveProps(newprops){
    // If a creation request is performed
    if(this.props.hookCreation.loading && !newprops.hookCreation.loading){
      if(newprops.hookCreation.success) {
        // On success
        this.hide_add();
        this.props.api_list();
      }
      if(!newprops.hookCreation.success){
        // On faillure
        alert('oups');
      }
    }
  }

  componentDidMount() {
      this.props.api_list();
  }

  toggle_delete = () => {
    this.setState({show_delete: !this.state.show_delete});
  };

  create = () => {
    this.props.api_add(
      this.refs.hook_title.getValue(),
      "webhook", // TODO: Change
      this.state.selected_feed,
      {}, {}, "n" // TODO: Change regarding type
    );
  };

  display_add = () => {
    this.setState({add_open: true});
  };

  hide_add = () => {
    this.setState({add_open: false});
  };

  actions_add = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.hide_add}
    />,
    <FlatButton
      label="Create"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.create}
    />,
  ];

  render() {
    return (
      <Card>
        <CardTitle
          title="Hooks"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.props.hooks.length === 0 &&
            <div><i>No Hooks</i></div>
          }
          <List onChange={() => alert(0)}>
            {this.props.hooks.map((hook) =>(
              <ListItem
                primaryText={hook.title}
                key={hook.id}
                onTouchTap={() => alert(0)}
                rightIconButton={ !this.state.show_delete ? undefined :
                  <ActionDelete onTouchTap={() => alert(1)} />
                } />
            ))}
          </List>
        </CardText>
        <CardText expandable={true}  style={{position: 'relative'}}>
          <div style={{position: 'absolute', 'bottom':10, 'right': 10}}>
            <FloatingActionButton onClick={this.toggle_delete} mini={true}>
              <ContentRemove />
            </FloatingActionButton>
            <FloatingActionButton onClick={this.display_add} mini={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <Dialog
            title="Create a new hook"
            actions={this.props.hookCreation.loading ?  <CircularProgress /> : this.actions_add}
            modal={true}
            open={this.state.add_open}
            onRequestClose={this.hide_add}>
            <TextField ref="hook_title" hintText="Hook name" /><br />
              <SelectField
                ref="hook_feed"
                floatingLabelText="Feed"
                value={this.state.selected_feed}
                onChange={this.handleFeedChange}>
                  {this.props.feeds.map((feed) =>(
                    <MenuItem value={feed.id} key={feed.id} primaryText={feed.title} />
                  ))}
                </SelectField>
          </Dialog>
        </CardText>
      </Card>
    )
  }
}

HooksMenu.propTypes = {
  hooks: PropTypes.array.isRequired,
  hookCreation: PropTypes.object.isRequired,
  hooksAvailable: PropTypes.array.isRequired,
  feeds: PropTypes.array.isRequired,
  api_list: PropTypes.func.isRequired,
  api_add: PropTypes.func.isRequired,
  api_remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    hooks: state.ficelle.hooks,
    hookCreation: state.ficelle.hookCreation,
    hooksAvailable: state.ficelle.hooksAvailable
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_list:() => {
      dispatch({type: "HOOK_LIST_REQUESTED"})
    },
    api_add:(title, type, feed, state, settings, frequency) => {
      dispatch({type: "HOOK_CREATE_REQUESTED", data: {title, type, feed, state, settings, frequency}})
    },
    api_remove:(id) => {
      dispatch({type: "HOOK_REMOVE_REQUESTED", data: {id}})
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HooksMenu);