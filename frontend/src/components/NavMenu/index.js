import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, TabBar } from '@rmwc/tabs';
import { Icon } from '@rmwc/icon'

import './NavMenu.scss';

const navMenu = () => (
  <footer className="footer">
    <TabBar className="nav-menu">
      <NavLink style={{width: '100%'}} to="/new">
          <Tab style={{width: '100%'}}>
            <Icon icon="add_box" />
          </Tab>
        </NavLink>
    </TabBar>
  </footer>
);

export default navMenu;