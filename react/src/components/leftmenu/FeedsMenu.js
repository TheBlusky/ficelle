import React, { Component, PropTypes } from 'react';
import {
  Card, CardText, CardTitle, CircularProgress, Dialog, FlatButton, FloatingActionButton, List, ListItem,
  TextField
} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {connect} from "react-redux";
import {ActionDelete} from "material-ui/svg-icons/index";

class FeedsMenu extends Component {
  state = {
    add_open: false,
    show_delete: false,
  };

  componentWillReceiveProps(newprops){
    // If a creation request is performed
    if(this.props.feedCreation.loading && !newprops.feedCreation.loading){
      if(newprops.feedCreation.success) {
        // On success
        this.hide_add();
        this.props.api_list();
      }
      if(!newprops.feedCreation.success){
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
    this.props.api_add(this.refs.feed_name.getValue())
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
            title="Feeds"
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText expandable={true}>

            {this.props.feeds.length === 0 &&
              <div><i>No feeds</i></div>
            }
    <List onChange={() => alert(0)}>
            {this.props.feeds.map((feed) =>(
              <ListItem
                primaryText={feed.title}
                key={feed.id}
                onTouchTap={() => alert(0)}
                rightIconButton={ !this.state.show_delete  ? undefined :
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
              title="Create a new feed"
              actions={this.props.feedCreation.loading ?  <CircularProgress /> : this.actions_add}
              modal={true}
              open={this.state.add_open}
              onRequestClose={this.hide_add}>
              <TextField ref="feed_name" hintText="Feed name" /><br />
            </Dialog>
          </CardText>
        </Card>
    )
  }
}

FeedsMenu.propTypes = {
  feeds: PropTypes.array.isRequired,
  feedCreation: PropTypes.object.isRequired,
  api_list: PropTypes.func.isRequired,
  api_add: PropTypes.func.isRequired,
  api_remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    feedCreation: state.ficelle.feedCreation,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_list:() => {
      dispatch({type: "FEED_LIST_REQUESTED"})
    },
    api_add:(title) => {
      dispatch({type: "FEED_CREATE_REQUESTED", data: {title}})
    },
    api_remove:(id) => {
      dispatch({type: "FEED_REMOVE_REQUESTED", data: {id}})
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsMenu);