import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, RaisedButton, Tab, Tabs, TextField} from "material-ui";
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux'

class LoginPage extends React.Component {
  componentWillReceiveProps(newprops){
    if(newprops.user.logged){
      this.props.history.push("/home")
    }
    if(newprops.user.registered && !this.props.user.registered){
      this.props.api_login(this.refs.register_email.getValue(), this.refs.register_password.getValue())
    }
  }

  componentDidMount() {
      this.props.api_me();
  }

  login = () => {
    this.props.api_login(this.refs.login_email.getValue(), this.refs.login_password.getValue())
  };

  register = () => {
    if(this.refs.register_password.getValue()===this.refs.register_password2.getValue()) {
      this.props.api_register(this.refs.register_email.getValue(), this.refs.register_password.getValue())
    }
  };

  render() {
    return (
      <Row style={{"margin": "10px"}}>
        <Col xs />
        <Col xs>
          <Card>
            <CardHeader title="Ficelle - Your own activity feed !" />
            <CardText>
              <Tabs>
                <Tab label="Login" >
                  <div>
                    <TextField ref="login_email" hintText="Email" type="email" /><br />
                    <TextField ref="login_password" hintText="Password" type="password" /><br />
                    <RaisedButton onClick={this.login} label="Login" primary={true} />
                  </div>
                </Tab>
                <Tab label="Register" >
                  <div>
                    <TextField ref="register_email" hintText="Email" type="email" /><br />
                    <TextField ref="register_password" hintText="Password" type="password" /><br />
                    <TextField ref="register_password2" hintText="Confirm password" type="password" /><br />
                    <RaisedButton onClick={this.register} label="Register" primary={true} />
                  </div>
                </Tab>
              </Tabs>
            </CardText></Card>
        </Col>
        <Col xs />
      </Row>

    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  api_login: PropTypes.func.isRequired,
  api_me: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.ficelle.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    api_login: (email, password) => {
      dispatch({type: "USER_LOGIN_REQUESTED", data: {email, password}})
    },
    api_register: (email, password) => {
      dispatch({type: "USER_REGISTER_REQUESTED", data: {email, password}})
    },
    api_me: (email, password) => {
      dispatch({type: "USER_ME_REQUESTED"})
    }
  }
};

const ConnectedLoginPage= connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
