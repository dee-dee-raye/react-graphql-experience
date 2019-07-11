import React from 'react';
import { ToolbarFixedAdjust, Toolbar, ToolbarRow, ToolbarTitle} from '@rmwc/toolbar'

import './Header.scss';

const header = () => (
    <header className="header">
        <Toolbar>
            <ToolbarRow className="row">
            <ToolbarTitle className="title">Doggogram</ToolbarTitle>
            </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />
    </header>

);

export default header

