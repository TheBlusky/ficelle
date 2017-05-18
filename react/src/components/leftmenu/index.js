import React, { Component } from 'react';
import FeedsMenu from "./FeedsMenu";
import HooksMenu from "./HooksMenu";
import UserMenu from "./UserMenu";
import FeedsTreeMenu from "./FeedsTreeMenu";

class LeftMenu extends Component {
  render() {
    return (
      <div>
        <UserMenu />
        <br />
        {/* <FeedsTreeMenu />
        <br /> */}
        <FeedsMenu />
        <br />
        <HooksMenu />
        <br />
      </div>
    )
  }
}

export default LeftMenu;