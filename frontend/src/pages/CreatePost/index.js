import React, { Component } from 'react';
import { Card, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { LinearProgress } from '@rmwc/linear-progress';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';

import './CreatePost.scss';
import ImageUpload from '../../components/ImageUpload';


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

    shareHandler = () => {
        if (this.state.description.trim().length === 0 || this.state.image === {}) {
            return;
        }
        this.setState({
            loadProgress: 0.2
        });
        const dateString = new Date().toISOString();
        
        const fd = new FormData();
        console.log(this.state.image)
        fd.append('image', this.state.image, this.state.image.name);

        fetch('https://us-central1-reactpets-be223.cloudfunctions.net/uploadFile', {
        method: 'POST',
        body: fd,
        headers: {
        }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                loadProgress: .5
            });
            console.log(resData);
            this.setState({imageUrl: resData.fileUrl});
            let requestBody = {
                query: `
                mutation {
                    createPost(postInput: {description: "${this.state.description}", date:"${dateString}", imageUrl:"${this.state.imageUrl}"}) {
                        imageUrl
                    }
                  }
                `
                };
            fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                this.setState({
                    loadProgress: 1.0
                });
                this.goBack();
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
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
                    <ImageUpload file={this.state.file} onHandleImageUpload={this.imageUploadHandler}></ImageUpload>
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

export default CreatePostPage;
