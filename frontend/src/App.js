import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import './App.scss';

import NavMenu from './components/NavMenu';
import Header from './components/Header';

import AuthPage from './pages/Auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
            </Switch>
          </main>
          <NavMenu />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
