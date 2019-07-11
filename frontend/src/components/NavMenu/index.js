import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, TabBar } from '@rmwc/tabs';
import { Icon } from '@rmwc/icon'

import './NavMenu.scss';

const navMenu = () => (
  <footer className="nav-menu">
    <TabBar>
        <Tab>
        <NavLink to="/new"><Icon icon="add_box" /></NavLink>
        </Tab>
    </TabBar>
  </footer>
);

export default navMenu;