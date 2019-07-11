import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import NavMenu from './components/NavMenu';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
            </Switch>
          </main>
          <NavMenu />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
