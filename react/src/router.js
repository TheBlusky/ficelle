import React, { Component } from 'react';
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import {HashRouter as Router, Route} from "react-router-dom"

class FicelleRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} /><br />
          <Route path="/home" component={MainPage} />
        </div>
      </Router>
    );
  }
}

export default FicelleRouter;
