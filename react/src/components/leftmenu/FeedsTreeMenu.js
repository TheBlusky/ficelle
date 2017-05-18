import React, { Component } from 'react';
import { Card, CardText, CardTitle} from "material-ui";
import SortableTree from 'react-sortable-tree';
import {connect} from "react-redux";
import NodeRendererFicelle from "./node-renderer/node-renderer-ficelle"

class FeedsTreeMenu extends Component {
  state = {
    treeData: [
      {
        title: '#servers',
        expanded: true,
        children: [
          { title: 'vps.blusky.fr' },
          { title: 'BluNas' },
        ]
      },
      {
        title: '#shopping',
        expanded: true,
        children: [
          { title: 'LaPoste' },
          { title: 'Fnac.com' },
        ]
      },
      {
        title: '#alert',
        expanded: true,
        children: [
          { title: 'IRC HL' },
          { title: 'ShowDownloader' },
        ]
      },
    ],};

  render() {
    return (
        <Card>
          <CardTitle
            title="Feeds" />
          <CardText>
            <div>
              <SortableTree
                maxDepth={2}
                scaffoldBlockPxWidth={30}
                canDrag={(info) => (info.path.length===2)}
                canDrop={(info) => (info.nextPath.length===2)}
                isVirtualized={false}
                treeData={this.state.treeData}
                nodeContentRenderer={NodeRendererFicelle}
                onChange={treeData => this.setState({ treeData })} />
            </div>
          </CardText>
        </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsTreeMenu);