import React from 'react';

import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';

import './BackButton.scss';

const backButton = (props) => (
    <div className="backbutton-area">
        <IconButton 
            icon="arrow_back" 
            color="primary" 
            label="go back"
            onClick={() => props.goBack()}/>
        <Typography use="headline5">{props.title}</Typography>
    </div>

);

export default backButton;