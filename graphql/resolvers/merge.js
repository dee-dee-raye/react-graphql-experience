const Post = require('../../models/post');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const posts = async postIds => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    return posts.map(post => {
      return transformPost(post);
    });
  } catch (err) {
    throw err;
  }
};

const singlePost = async postId => {
  try {
    const post = await Post.findById(postId);
    return transformPost(post);
  } catch (err) {
    throw err;
  }
};

const transformUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdPosts: posts.bind(this, user._doc.createdPosts)
    };
  } catch (err) {
    throw err;
  }
};

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    date: dateToString(post._doc.date),
    creator: transformUser.bind(this, post.creator),
    imageUrl: post._doc.imageUrl
  };
};

const transformLike = like => {
  return {
    ...like._doc,
    _id: like.id,
    user: transformUser.bind(this, like._doc.user),
    post: singlePost.bind(this, like._doc.post),
    createdAt: dateToString(like._doc.createdAt),
    updatedAt: dateToString(like._doc.updatedAt)
  };
};

exports.transformPost = transformPost;
exports.transformUser = transformUser;
exports.transformLike = transformLike;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
