import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import './App.scss';

import NavMenu from './components/NavMenu';
import Header from './components/Header';

import AuthPage from './pages/Auth';
import FeedPage from './pages/Feed';
import CreatePostPage from './pages/CreatePost';
import ProfilePage from './pages/Profile';
import EditProfilePage from './pages/EditProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

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
              {this.props.loggedIn && <Route path="/edit" component={EditProfilePage} />}
              {this.props.loggedIn && <Route path="/feed" component={FeedPage} />}
              {this.props.loggedIn && <Route path="/new" component={CreatePostPage} />}
              {this.props.loggedIn && <Route path="/profile" component={ProfilePage} />}
            </Switch>
          </main>
          {this.props.loggedIn && <NavMenu currentUser={this.props.currentUser} />}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, currentUser } = state;
  return {
      loggedIn,
      currentUser
  };
}

export default connect(mapStateToProps)(App);
