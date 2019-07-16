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

const user = async userId => {
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
    creator: user.bind(this, post.creator),
    imageUrl: post._doc.imageUrl
  };
};

// const transformBooking = booking => {
//   return {
//     ...booking._doc,
//     _id: booking.id,
//     user: user.bind(this, booking._doc.user),
//     event: singleEvent.bind(this, booking._doc.event),
//     createdAt: dateToString(booking._doc.createdAt),
//     updatedAt: dateToString(booking._doc.updatedAt)
//   };
// };

exports.transformPost = transformPost;
// exports.transformBooking = transformBooking;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
