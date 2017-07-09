import React from 'react';
import {IconButton} from "material-ui";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from "react-redux";

class HookItem extends React.Component {
  render() {
    return(
      <div>
        @{this.props.hook.title}
        <IconMenu
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          iconButtonElement={
            <IconButton
              iconStyle={{width: 16, height: 16}}
              style={{width: 16, height: 16, padding: 0, paddingLeft: 10}}>
              <MoreVertIcon />
            </IconButton>
          }>
          <MenuItem onClick={() => this.props.changeFilter(this.props.hook.id)} primaryText="Select" />
          <MenuItem onClick={() => this.props.hook_edit_load(this.props.hook.id)} primaryText="Configure" />
          <MenuItem onClick={() => {/* Todo */  alert('To be implemented')}} primaryText="Execute now" />
        </IconMenu>
      </div>);
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hook_edit_load:(hook_id) => {
      dispatch({type: "HOOKEDIT_LOAD_REQUEST", data: {hook_id}})
    },
    changeFilter:(id) => {
      dispatch({type: "FILTERS_CHANGE", id})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HookItem);
