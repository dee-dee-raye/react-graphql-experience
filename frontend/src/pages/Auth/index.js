import React, { Component } from 'react';
import { Card, CardPrimaryAction, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { FormField } from '@rmwc/formfield';
import { Typography } from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'

import './Auth.scss';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLogin: true,
        email: '',
        password: '',
        username: ''
      };
  }

  switchModeHandler = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  submitHandler = () => {
    if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${this.state.email}", password: "${this.state.password}") {
            userId
            token
            tokenExpiration
            username
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.state.email}", password: "${this.state.password}", userName: "${this.state.username}"}) {
              _id
              email
              username
            }
          }
        `
      };
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
        console.log(resData);
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
      <Card className="auth-form">
          <CardPrimaryAction className="primary-content">
            <Typography className="title" use="headline6" tag="h2"> {this.state.isLogin ? 'Login' : 'Signup'} </Typography>
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
    );
  }
}

export default AuthPage;
