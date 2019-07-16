import React from 'react';
import { Card, CardPrimaryAction, CardMedia, CardActions } from '@rmwc/card';
import { IconButton } from '@rmwc/icon-button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Typography } from '@rmwc/typography'

import './Post.scss';

const post = (props) => (
    <div className="post-area">
        <Card className="post-card">
            <CardPrimaryAction>
                <CardMedia
                square
                style={{
                    backgroundImage: 'url('+props.post.imageUrl+')'
                }}
                />
            </CardPrimaryAction>
            <CardActions className="post-actions">
                <IconButton className="post-icon" icon="favorite_outline" label="Favorite" />
            </CardActions>
            <div>
                <Typography
                    use="subtitle2"
                    tag="h3"
                    theme="textSecondaryOnBackground"
                    style={{ marginTop: '-1rem' }}>
                    {props.post.date.substring(0,10)}
                </Typography>
                <ExpansionPanel className="post-caption">
                    <ExpansionPanelSummary
                    aria-controls="caption-content"
                    id="panel1a-header"
                    className="post-caption-start">
                    <Typography
                        use="body1"
                        tag="div"
                        theme="textSecondaryOnBackground">
                        {props.post.description.split(" ").slice(0,4).join(" ")}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography
                        use="body1"
                        tag="div"
                        theme="textSecondaryOnBackground"
                        className="post-caption-end">
                        {props.post.description.split(" ").slice(4).join(" ")}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Card>
    </div>
);

export default post;