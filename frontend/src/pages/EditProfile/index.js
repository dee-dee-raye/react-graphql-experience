import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardActionButtons, CardActionButton } from '@rmwc/card';
import { LinearProgress } from '@rmwc/linear-progress';
import { TextField } from '@rmwc/textfield';

import './EditProfile.scss';
import ImageUpload from '../../components/ImageUpload';
import BackButton from '../../components/BackButton';
import { fetchGeneralAuthorized, fetchImageUpload } from '../../api';


class EditProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.currentUser.userName,
            image: {},
            email: this.props.currentUser.email,
            imageUrl: this.props.currentUser.profilePic,
            loadProgress: 0.0
          };
      }

    imageUploadHandler = (image) => {
        this.setState({image: image});
    }

    updateProfileHandler = async () => {
        if (this.state.userName.trim().length === 0 || this.state.image === {} ||
            this.state.email.trim().length === 0) {
            return;
        }

        this.setState({
            loadProgress: 0.2
        });
        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name);
        let resDataImage = await fetchImageUpload(fd);
        console.log(resDataImage.fileUrl)
        this.setState({imageUrl: resDataImage.fileUrl});
        this.setState({
            loadProgress: .5
        });
        console.log(this.props.currentUser)
        let requestBody = {
            query: `
            mutation {
                editUser(userInput:{userId:"${this.props.currentUser._id}", email:"${this.state.email}", profilePic:"${this.state.imageUrl}", userName:"${this.state.userName}"}) {
                    email
                    userName
                    profilePic
                }
              }
            `
            };
        console.log(this.state.fileUrl);
        fetchGeneralAuthorized(requestBody, this.props.token.token).then(res => {
            this.setState({
                loadProgress: 1.0
            });
            let tempUser = {};
            console.log(res.data.editUser)
            Object.assign(tempUser, this.props.currentUser);
            tempUser.email = res.data.editUser.email;
            tempUser.userName = res.data.editUser.userName;
            tempUser.profilePic = res.data.editUser.profilePic;
            this.props.setCurrentUser({...tempUser});
            this.goBack();
        });
    };


    goBack = () => {
        this.setState({
            userName: '',
            image: {},
            email: '',
            imageUrl: '',
            loadProgress: 0.0
        });
        this.props.history.push('/profile');
    };

    render() {
        return (
            <div className="edit-profile-area">
                {this.state.loadProgress !== 0.0 && <LinearProgress progress={this.state.loadProgress} />}
                <BackButton title={'Edit Profile'} goBack={this.goBack}/>
                <Card className="edit-profile-card">
                    <ImageUpload text={'Upload New Profile Pic'} file={this.state.file} onHandleImageUpload={this.imageUploadHandler}></ImageUpload>
                    <TextField style={{backgroundColor: 'white'}} label="Username"
                    value={this.state.userName}
                    onChange={(e) => {this.setState({userName: e.currentTarget.value})}} />
                    <TextField style={{backgroundColor: 'white'}} label="E-Mail"
                    value={this.state.email}
                    onChange={(e) => {this.setState({email: e.currentTarget.value})}} />
                    <CardActions>
                    <CardActionButtons>
                        <CardActionButton onClick={this.updateProfileHandler}>Save</CardActionButton>
                    </CardActionButtons>
                </CardActions>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { currentUser, token } = state;
    return {
        currentUser,
        token
    };
  };

  function mapDispatchToProps(dispatch) {
    return {
      setCurrentUser: (user) => {
          dispatch({ type: 'SET_CURRENT_USER', currentUser: user})
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
