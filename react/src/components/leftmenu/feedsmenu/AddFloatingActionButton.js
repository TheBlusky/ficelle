import React, { Component } from 'react';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AddHookDialog from "./AddHookDialog";
import AddFeedDialog from "./AddFeedDialog";

class AddFloatingActionButton extends Component {
  state = {
    feed_add_open: 0,
    hook_add_open: 0
  };

  render() {
    return (
      <div style={{position: 'absolute', 'bottom':10, 'right': 10}}>
        <SpeedDial fabContentOpen={<ContentAdd />} fabContentClose={<NavigationClose />}>
          <SpeedDialItem
            label={<div style={{backgroundColor: "#FFFFFF"}}>New Hook</div>}
            fabContent={"@"}
            onTouchTap={() => {this.setState({hook_add_open: this.state.hook_add_open + 1})}} />
          <SpeedDialItem
            label={<div style={{backgroundColor: "#FFFFFF"}}>New Feed</div>}
            fabContent="#"
            onTouchTap={() => {this.setState({feed_add_open: this.state.feed_add_open + 1})}} />
        </SpeedDial>
        <AddFeedDialog feed_add_open={this.state.feed_add_open} />
        <AddHookDialog hook_add_open={this.state.hook_add_open} />
      </div>
    );
  }
}


export default AddFloatingActionButton;