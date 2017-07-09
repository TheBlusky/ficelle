import React from 'react';
import {IconButton} from "material-ui";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from "react-redux";

class FeedItem extends React.Component {
  render() {
    return(
      <div>
        @{this.props.feed.title}
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
          <MenuItem onClick={() => this.props.changeFilter(this.props.feed.id)} primaryText="Select" />
          <MenuItem onClick={() => this.props.feed_edit_load(this.props.feed.id)} primaryText="Configure" />
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
    feed_edit_load:(feed_id) => {
      dispatch({type: "FEEDEDIT_LOAD_REQUEST", data: {feed_id}});
    },
    changeFilter:(id) => {
      dispatch({type: "FILTERS_CHANGE", id})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedItem);
