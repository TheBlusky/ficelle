import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item";
import {connect} from "react-redux";

class Feed extends Component {
  componentDidMount() {
    if(this.props.items.lastUpdate===0) {
      this.props.api_list();
    }
  }

  render() {
    return (
      <div>
        {
          this.props.items.items
            .filter(item => (
              (this.props.filters.id === undefined) ||
              (this.props.filters.id === item.hook.id) ||
              (this.props.filters.id === item.feed.id)
            ))
            .map(item => (
              <Item key={item.id} item={item} />
            ))
        }
      </div>
    )
  }
}

Feed.propTypes = {
  items: PropTypes.object.isRequired,
  api_list: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.ficelle.items,
    filters: state.ficelle.filters,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_list:() => {
      dispatch({type: "ITEM_LIST_REQUESTED"})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);