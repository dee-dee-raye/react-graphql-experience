import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { LinearProgress } from '@rmwc/linear-progress';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';

import './CreatePost.scss';
import ImageUpload from '../../components/ImageUpload';
import { fetchGeneralAuthorized, fetchImageUpload } from '../../api';


class CreatePostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            image: {},
            imageUrl: '',
            loadProgress: 0.0
          };
      }

    imageUploadHandler = (image) => {
        this.setState({image: image});
    }

    shareHandler = async () => {
        if (this.state.description.trim().length === 0 || this.state.image === {}) {
            return;
        }

        this.setState({
            loadProgress: 0.2
        });
        const dateString = new Date().toISOString();
        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name);
        let resDataImage = await fetchImageUpload(fd);
        this.setState({imageUrl: resDataImage.fileUrl});
        this.setState({
            loadProgress: .5
        });

        let requestBody = {
            query: `
            mutation {
                createPost(postInput: {description: "${this.state.description}", date:"${dateString}", imageUrl:"${this.state.imageUrl}"}) {
                    imageUrl
                }
                }
            `
            };
        fetchGeneralAuthorized(requestBody, this.props.token.token).then(res => {
            this.setState({
                loadProgress: 1.0
            });
            this.goBack();
        });
    };

    goBack = () => {
        this.setState({
            description: '',
            image: {},
            imageUrl: '',
            loadProgress: 0.0
        });
        this.props.history.push('/feed');
    };

    render() {
        return (
            <div className="create-post-area">
                {this.state.loadProgress !== 0.0 && <LinearProgress progress={this.state.loadProgress} />}
                <IconButton 
                icon="arrow_back" 
                color="primary" 
                label="go back"
                onClick={this.goBack}/>
                <Card className="create-post-card">
                    <ImageUpload text={'Upload Post Photo'} file={this.state.file} onHandleImageUpload={this.imageUploadHandler}></ImageUpload>
                    <TextField className="create-post-caption" label="Caption"
                    value={this.state.description}
                    onChange={(e) => {this.setState({description: e.currentTarget.value})}} />
                    <CardActions>
                    <CardActionButtons>
                        <CardActionButton onClick={this.shareHandler}>Share</CardActionButton>
                    </CardActionButtons>
                </CardActions>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { token } = state;
    return {
        token
    };
  }
  
  export default connect(mapStateToProps)(CreatePostPage);
