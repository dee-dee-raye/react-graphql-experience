import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardPrimaryAction, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { fetchGeneral } from '../../api';

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

  fetchLogin = async () => {
    const  requestBody = {
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
      let resData = await fetchGeneral(requestBody);
      this.props.setToken({token: resData.data.login.token, 
        tokenExpiration: resData.data.login.tokenExpiration});
     
      this.props.setProfile({userId: resData.data.login.userId});
      if(this.state.isLogin) {
        await this.fetchGetUser(resData.data.login.userId);
        this.props.setLoggedIn(true);
      } else {
        this.props.setLoggedIn(true);
      }
  };

  fetchCreateUser = async () => {
    const requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.state.email}", 
            password: "${this.state.password}", 
            userName: "${this.state.username}"}) {
              _id
              userName
              email
              profilePic
              createdPosts {
                _id
                description
                date
                imageUrl
              }
            }
          }
        `
      };
      const resData = await fetchGeneral(requestBody);
      this.props.setProfile({userId: resData.data.user._id});
      this.props.setCurrentUser({...resData.data.user});
      this.fetchLogin();
  }

  fetchGetUser = async (userId) => {
      const requestBody = {
          query:`
          query {
            user(userId: "${userId}") {
            _id
            userName
            email
            profilePic
            createdPosts {
                _id
                description
                date
                imageUrl
            }
          }
        }
          `
      };
      const resData = await fetchGeneral(requestBody);
      console.log(resData)
      this.props.setCurrentUser({...resData.data.user});
  }

  submitHandler = () => {
    if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
      return;
    }

    if (this.state.isLogin) {
        this.fetchLogin();
    } else {
        this.fetchCreateUser();
    }

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
      },
      setCurrentUser: (user) => {
          dispatch({ type: 'SET_CURRENT_USER', currentUser: user})
      }
    }
  }
  
  

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
