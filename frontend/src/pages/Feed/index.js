import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from '../../components/Post';

import './Feed.scss';

class FeedPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        posts: []
    };
  }

  componentDidMount() {
      this.fetchPosts();
  }

  fetchPosts = () => {
    let requestBody = {
      query: `
        query {
          posts {
            _id
            description
            date
            imageUri
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
        this.setState({posts: resData.data.posts})
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const postList = this.state.posts.map(post => {
        return <Post key={post._id} post={post}></Post>
    })
    return (
        <div className="feed-area">
            {postList}
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
  
  export default connect(mapStateToProps)(FeedPage);