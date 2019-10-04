import React, { Component } from 'react';
import { Card, CardPrimaryAction, CardMedia, CardActions } from '@rmwc/card';
import { IconButton } from '@rmwc/icon-button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Typography } from '@rmwc/typography'
import { Avatar } from '@rmwc/avatar';

import { fetchGeneralAuthorized } from '../../api';
import './Post.scss';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likedByCurrentUser: false,
            likeByCurrentUserId: ''
        };
    }

    componentDidMount() {
        this.fetchLikeInfo();
    }

    fetchLikeInfo = async () => {
        console.log()
        let requestBody = {
            query:`
            query {
                likes {
                    post {
                        _id
                    }
                }
            }`
        };

        let resData = await fetchGeneralAuthorized(requestBody, this.props.token.token);
        console.log(resData.data.likes)
        console.log(resData.data.likes.post);
    }

    reactToPost = (like) => {
        let requestBody = {
            query:`
            mutation {
                likePost(postId:"${this.props.post._id}") {
                    user {
                        userName
                    }
                }
            }`
        };
        if (!like) {
            requestBody = {
                query:`
                mutation {
                    unlikePost(likeId:"${this.state.likeByCurrentUserId}") {
                        post {
                            _id
                        }
                    }
                }`
            };
        }
        fetchGeneralAuthorized(requestBody, this.props.token.token).then(() => {
            this.setState({likedByCurrentUser: true});
        })
    }

    render() {
        return (
            <div className="post-area">
                <Card className="post-card">
                    <CardActions className="post-actions">
                        <Avatar
                            src={this.props.post.creator.profilePic}
                            size="medium"
                            name={this.props.post.creator.username}
                            />
                        <Typography
                            use="subtitle2"
                            theme="textSecondaryOnBackground"
                            style={{ paddingLeft: '1rem' }}>
                            {this.props.post.creator.userName}
                        </Typography>
                    </CardActions>
                    <CardPrimaryAction>
                        <CardMedia
                        square
                        style={{
                            backgroundImage: 'url('+this.props.post.imageUrl+')'
                        }}
                        />
                    </CardPrimaryAction>
                    <CardActions className="post-actions">
                        {!this.state.likedByCurrentUser && <IconButton className="post-icon" icon="favorite_outline" label="Favorite" onClick={() => this.reactToPost(true)}/>}
                        {this.state.likedByCurrentUser && <IconButton className="post-icon" icon="favorite" label="Favorite" onClick={() => this.reactToPost(false)}/>}
                    </CardActions>
                    <div>
                        <Typography
                            use="subtitle2"
                            tag="h3"
                            theme="textSecondaryOnBackground"
                            style={{ marginTop: '-1rem' }}>
                            {this.props.post.date.substring(0,10)}
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
                                {this.props.post.description.split(" ").slice(0,4).join(" ")}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography
                                use="body1"
                                tag="div"
                                theme="textSecondaryOnBackground"
                                className="post-caption-end">
                                {this.props.post.description.split(" ").slice(4).join(" ")}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Card>
            </div>
        );
    }

}

export default Post;