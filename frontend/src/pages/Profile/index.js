import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardActionButtons } from '@rmwc/card';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { Avatar } from '@rmwc/avatar';
import { ImageList, ImageListItem, ImageListImageAspectContainer, ImageListImage } from '@rmwc/image-list';

import Post from '../../components/Post';
import BackButton from '../../components/BackButton';

import './Profile.scss';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfPosts: this.props.currentUser.createdPosts.length,
            followers: 0,
            following: 0,
            isGridView: true
        };
    }

    render() {
        return (
           <div style={{width: '100%'}}>
                  {this.state.isGridView &&
                  <span>
                    <BackButton title={'Profile'} goBack={() => this.props.history.push('/feed')}/>
                    <div className="profile-area-top">
                        <Card className="profile-card">
                            <Avatar
                            src={this.props.currentUser.profilePic}
                            size="xlarge"
                            contain
                            name={this.props.currentUser.username}
                            />
                            <div className="title">
                                <Typography use="headline6">{'@'+this.props.currentUser.userName}</Typography>
                            </div>
                            <div className="bio">
                                <Typography use="body1">
                                    adfsghjhgfdsdfghhgfds
                                </Typography>
                            </div>
                            <div className="stats-area">
                                <div className="stats-item">
                                    <Typography use="subtitle1">{this.state.numberOfPosts}</Typography>
                                    <Typography use="subtitle2">Posts</Typography>
                                </div>
                                <div className="stats-item">
                                    <Typography use="subtitle1">{this.state.followers}</Typography>
                                    <Typography use="subtitle2">Followers</Typography>
                                </div>
                                <div className="stats-item">
                                    <Typography use="subtitle1">{this.state.following}</Typography>
                                    <Typography use="subtitle2">Following</Typography>
                                </div>
                            </div>
                            <CardActions>
                                <CardActionButtons className="edit-button-area">
                                    <Button onClick={() => this.props.history.push('/edit')} className="edit-button" label="Edit Profile" raised />
                                </CardActionButtons>
                            </CardActions>
                        </Card>
                    </div>
                    <div className="profile-area-bottom">
                        <ImageList className="image-list">
                        {this.props.currentUser.createdPosts.map(post => (
                                <ImageListItem
                                key={post._id}
                                className="image-item"
                                onClick={() => this.setState({isGridView: !this.state.isGridView})}
                                >
                                <ImageListImageAspectContainer className="image-aspect-container">
                                    <ImageListImage src={post.imageUrl} />
                                </ImageListImageAspectContainer>
                                </ImageListItem>
                            )
                        )}
                        </ImageList>
                    </div>
                </span>
            }
                {!this.state.isGridView &&
                    <span>
                        <BackButton title={'Profile'} goBack={() => this.setState({isGridView: !this.state.isGridView})}/>
                        {this.props.currentUser.createdPosts.map(post => (
                            <Post key={post._id} post={post}></Post>
                        ))}
                    </span>
                    
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentUser } = state;
    return {
        currentUser
    };
  }

export default connect(mapStateToProps)(ProfilePage);