import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimaryAction, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';

import './Auth.scss';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLogin: true,
        isLoggedIn: false,
        email: '',
        password: '',
        username: '',
        profile: {},
        token: ''
      };
  }

  switchModeHandler = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  submitHandler = () => {
    if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
      return;
    }

    console.log(this.state.email)
    console.log(this.state.password)

    let requestBody = {
      query: `
        query {
          login(email: "${this.state.email}", password: "${this.state.password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.state.email}", 
            password: "${this.state.password}", 
            userName: "${this.state.username}"}) {
              _id
              email
              userName
            }
          }
        `
      };

      console.log(this.state.username)
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
          if (this.state.isLogin) {
              this.props.setToken({token: resData.data.login.token, 
                tokenExpiration: resData.data.login.tokenExpiration});
              this.props.setLoggedIn(true);
              this.props.setProfile({userId: resData.data.login.userId})
          }
        console.log(resData);
        this.props.setLoggedIn(true);
        this.props.setProfile({'username': resData.username});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
      let usernameField = null;
      if (!this.state.isLogin) {
            usernameField = (
            <TextField fullwidth label="Username" type="username"
            value={this.state.username} 
            onChange={(e) => {this.setState({username: e.currentTarget.value})}} />
          );
      }

    return (
        <div className="auth-area">
            <Card className="auth-card">
                <CardPrimaryAction className="primary-content">
                    <Typography style= {{textAlign: 'center'}} use="headline6" tag="h2"> {this.state.isLogin ? 'Login' : 'Signup'} </Typography>
                        { usernameField }
                        <TextField fullwidth label="Email" type="email"
                        value={this.state.email} 
                        onChange={(e) => {this.setState({email: e.currentTarget.value})}} />
                        <TextField fullwidth label="Password" type="password"
                        value={this.state.password}
                        onChange={(e) => {this.setState({password: e.currentTarget.value})}} />
                </CardPrimaryAction>
                <CardActions>
                    <CardActionButtons>
                        <CardActionButton onClick={this.submitHandler}>Submit</CardActionButton>
                        <CardActionButton onClick={this.switchModeHandler}>
                            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                        </CardActionButton>
                    </CardActionButtons>
                </CardActions>
            </Card>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
      token: state.token,
      email: state.email,
      tokenExpiration: state.tokenExpiration,
      loggedIn: state.isLoggedIn
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setLoggedIn: (loggedIn) => {
        dispatch({ type: 'SET_LOGGED_IN', loggedIn: loggedIn })
      },
      setProfile: (profile) => {
        dispatch({ type: 'SET_PROFILE', profile: profile }) 
      },
      setToken: (token) => {
          dispatch({ type: 'SET_TOKEN', token: token})
      }
    }
  }
  
  

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
