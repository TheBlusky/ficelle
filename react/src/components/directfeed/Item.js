import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Avatar, Card, CardText, Chip} from "material-ui";

class Item extends Component {
  render() {
    const data = JSON.parse(this.props.item.data);
    return (
      <div>
        <Card>
          <CardText>
          <div>
            <div style={{display: 'flex',flexWrap: 'wrap', margin: 'auto'}}>
              <Chip style={{marginRight: '1em'}}>
                <Avatar size={16}>F</Avatar>
                @{this.props.item.hook.title}
              </Chip>
              <Chip style={{marginRight: '1em'}}>
                <Avatar size={16}>H</Avatar>
                #{this.props.item.feed.title}
              </Chip>
            </div>
            <div>
              <i>
                { moment(this.props.item.created).fromNow() }
                {" "}
                ({ moment(this.props.item.created).format('MMMM Do YYYY, h:mm:ss a') })
                </i>
            </div>
            <div>
              {data.title} - {data.text}
            </div>
          </div>
            </CardText>
        </Card>
        <br />
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item