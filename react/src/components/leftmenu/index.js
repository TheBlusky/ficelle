import React, { Component } from 'react';
import UserMenu from "./UserMenu";
import FeedsMenu from "./feedsmenu";

class LeftMenu extends Component {
  render() {
    return (
      <div>
        <UserMenu />
        <br />
        <FeedsMenu />
        <br />
      </div>
    )
  }
}

export default LeftMenu;