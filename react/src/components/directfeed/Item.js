import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Avatar, Card, CardText, Chip} from "material-ui";
import Color from 'color'
import {connect} from "react-redux";


class Item extends Component {
  getLightColor(id) {
    const salt = parseInt(id.split("-")[0],16) % 360;
    const ret = Color(`hsl(${salt}, 100%, 90%)`).hsl().string();
    return ret;
  };

  getDarkColor(id) {
    const salt = parseInt(id.split("-")[0],16) % 360;
    const ret = Color(`hsl(${salt}, 100%, 10%)`).hsl().string();
    return ret;
  };

  render() {
    const data = JSON.parse(this.props.item.data);
    return (
      <div>
        <Card>
          <CardText>
          <div>
            <div style={{display: 'flex',flexWrap: 'wrap', margin: 'auto'}}>
              <Chip
                style={{marginRight: '1em'}}
                backgroundColor={this.getLightColor(this.props.item.hook.id)}
                onTouchTap={() => this.props.changeFilter(this.props.item.hook.id)}
                onRequestDelete={this.props.filters.id == this.props.item.hook.id ? this.props.removeFilter : false}
              >
                <Avatar size={16} backgroundColor={this.getDarkColor(this.props.item.hook.id)}>F</Avatar>
                @{this.props.item.hook.title}
              </Chip>
              <Chip
                style={{marginRight: '1em'}}
                backgroundColor={this.getLightColor(this.props.item.feed.id)}
                onTouchTap={() => this.props.changeFilter(this.props.item.feed.id)}
                onRequestDelete={this.props.filters.id == this.props.item.feed.id ? this.props.removeFilter : false}
              >
                <Avatar size={16} backgroundColor={this.getDarkColor(this.props.item.feed.id)}>H</Avatar>
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


const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.ficelle.filters,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFilter:() => {
      dispatch({type: "FILTERS_REMOVE"})
    },
    changeFilter:(id) => {
      dispatch({type: "FILTERS_CHANGE", id})
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
