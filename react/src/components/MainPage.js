import React, { Component } from 'react';
import {Col, Row} from "react-flexbox-grid";
import LeftMenu from "./leftmenu";
import DirectFeed from "./directfeed";
import {Route} from "react-router-dom";

const tdb = () => <div>ToBeDefined</div>;

class MainPage extends Component {
  render() {
    return (
      <Row style={{"margin": "10px"}}>
        <Col lg={3} md={4} sm={5} xs={12}>
          <LeftMenu />
        </Col>
        <Col lg={9} md={8} sm={7} xs={12}>
            <div>
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

export default MainPage;
