import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import './App.scss';

import NavMenu from './components/NavMenu';
import Header from './components/Header';

import AuthPage from './pages/Auth';

class App extends Component {
  render() {
    let header = null;
    let navMenu = null;
    if (this.props.loggedIn) {
      header = <Header />;
      navMenu = <NavMenu />;
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          {header}
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
            </Switch>
          </main>
          {navMenu}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state;
  return {
      loggedIn
  };
}

export default connect(mapStateToProps)(App);
