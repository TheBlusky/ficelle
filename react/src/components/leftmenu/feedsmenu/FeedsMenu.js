import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle, IconButton} from "material-ui";
import SortableTree from 'react-sortable-tree';
import {connect} from "react-redux";
import NodeRendererFicelle from "./node-renderer/node-renderer-ficelle"
import AddFloatingActionButton from "./AddFloatingActionButton";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import HookItem from "./HookItem";
import FeedItem from "./FeedItem";

class FeedsMenu extends Component {
  state = {
    treeData: []
  };

  componentWillReceiveProps(newprops){
    // conversion of feeds to tree data
    this.setState({
      treeData: newprops.feeds.map(
        feed => ({
          title: <FeedItem feed={feed} />,
          cleanTitle: feed.title,
          id: feed.id,
          expanded: true,
          children: feed.hook_set.map(
            hook => ({
              title: <HookItem hook={hook} />,
              id: hook.id,
              cleanTitle: hook.title
            })
          ).sort(
            (hook1, hook2) => (
              hook1.cleanTitle.toLowerCase() >= hook2.cleanTitle.toLowerCase()
            )
          )
        })
      ).sort(
        (feed1, feed2) => (
          feed1.cleanTitle.toLowerCase() >= feed2.cleanTitle.toLowerCase()
        )
      )
    });
  }

  componentDidMount() {
      this.props.feeds_api_list();
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            title="Feeds" />
          <CardText style={{padding:0, position: 'relative'}}>
            <div style={{minHeight: 80}}>
              <SortableTree
                maxDepth={2}
                rowHeight={40}
                scaffoldBlockPxWidth={35}
                onMoveNode={data => this.props.hooks_api_move(data.path[1], data.path[0])}
                canDrag={(info) => (info.path.length===2)}
                canDrop={(info) => (info.nextPath.length===2)}
                isVirtualized={false}
                treeData={this.state.treeData}
                nodeContentRenderer={NodeRendererFicelle}
                getNodeKey={(data) => (data.node.id)}
                onChange={treeData => this.setState({ treeData })} />
            </div>
            <div style={{height: 100}} />
            <AddFloatingActionButton />
          </CardText>
        </Card>
      </div>
    )
  }
}

FeedsMenu.propTypes = {
  feeds: PropTypes.array.isRequired,
  feeds_api_list: PropTypes.func.isRequired,
  hooksAvailable: PropTypes.array.isRequired,
  hooks_api_move: PropTypes.func.isRequired,
  hook_edit_load: PropTypes.func.isRequired,
  feed_edit_load: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    feeds: state.ficelle.feeds,
    hooksAvailable: state.ficelle.hooksAvailable
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    feeds_api_list:() => {
      dispatch({type: "FEED_LIST_REQUESTED"})
    },
    hooks_api_move:(hook_id, to_feed_id) => {
      dispatch({type: "HOOK_MOVE_REQUESTED", data: {hook_id, to_feed_id}})
    },
    hook_edit_load:(hook_id) => {
      dispatch({type: "HOOKEDIT_LOAD_REQUEST", data: {hook_id}})
    },
    feed_edit_load:(feed_id) => {
      dispatch({type: "FEEDEDIT_LOAD_REQUEST", data: {feed_id}});
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsMenu);