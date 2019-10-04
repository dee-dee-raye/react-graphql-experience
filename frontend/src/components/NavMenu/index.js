import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Icon } from '@rmwc/icon';
import { Avatar } from '@rmwc/avatar';

import './NavMenu.scss';

const navMenu = (props) => (
  <footer className="footer">
    <ul className="nav-menu" style={{width: '100%'}}>
    <li className="nav-item">
      <NavLink style={{width: '50%'}} to="/feed">
            <Icon icon="home" />
        </NavLink>
      </li>
      <li className="nav-item">
      <NavLink style={{width: '50%'}} to="/new">
            <Icon icon="add_box" />
        </NavLink>
      </li>
      <li className="nav-item">
      <NavLink style={{width: '50%'}} to="/profile">
            <Avatar
            src={props.currentUser.profilePic}
            size="medium"
            name={props.currentUser.username}
            />
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default navMenu;