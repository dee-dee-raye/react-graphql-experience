import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import './App.scss';

import NavMenu from './components/NavMenu';
import Header from './components/Header';

import AuthPage from './pages/Auth';
import FeedPage from './pages/Feed';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {this.props.loggedIn && <Header />}
          <main className="main-content">
            <Switch>
              {!this.props.loggedIn && <Redirect from="/" to="/auth" exact />}
              {this.props.loggedIn && <Redirect from="/" to="/feed" exact />}
              {!this.props.loggedIn && <Route path="/auth" component={AuthPage} />}
              {this.props.loggedIn && <Redirect from="/auth" to="/feed" exact />}
              {this.props.loggedIn && <Route path="/feed" component={FeedPage} />}
            </Switch>
          </main>
          {this.props.loggedIn && <NavMenu />}
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
