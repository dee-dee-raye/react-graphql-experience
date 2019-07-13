import React from 'react';
import { TopAppBar, TopAppBarRow, TopAppBarTitle, TopAppBarSection, TopAppBarFixedAdjust} from  '@rmwc/top-app-bar';

import './Header.scss';

const header = () => (
    <header className="header">
        <TopAppBar fixed>
            <TopAppBarRow>
            <TopAppBarSection className="row">
                <TopAppBarTitle className="title">Doggogram</TopAppBarTitle>
            </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
    </header>

);

export default header

