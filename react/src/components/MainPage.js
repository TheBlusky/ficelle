import React, { Component } from 'react';
import {Col, Row} from "react-flexbox-grid";
import LeftMenu from "./leftmenu";
import DirectFeed from "./directfeed";
import {Route} from "react-router-dom";
import HookEdit from "./HookEdit";
import { connect } from 'react-redux'
import FeedEdit from "./FeedEdit";
import FicelleWebSocket from "./FicelleWebSocket";

const tdb = () => <div>ToBeDefined</div>;

class MainPage extends Component {

  componentWillReceiveProps(newprops){
    if(!newprops.user.logged){
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <Row style={{"margin": "10px"}}>
        <Col lg={2} md={3} sm={5} xs={12}>
          <LeftMenu />
        </Col>
        <Col lg={10} md={9} sm={7} xs={12}>
            <div>

              <HookEdit />
              <FeedEdit />
              <FicelleWebSocket />
              <Route exact path="/home" component={DirectFeed} />
              <Route path="/home/feeds" component={tdb} />
              <Route path="/home/hooks" component={tdb} />
              <Route path="/home/settings" component={tdb} />
            </div>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.ficelle.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
