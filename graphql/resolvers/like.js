const Post = require('../../models/post');
const Like = require('../../models/like');
const { transformPost, transformLike } = require('./merge');

module.exports = {
  likes: async (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const likes = await Like.find({user: req.userId});
        return likes.map(like => {
          return transformLike(like);
        });
      } catch (err) {
        throw err;
      }
  },
  likePost: async (args, req) => {
      console.log('here')
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedPost = await Post.findOne({ _id: args.postId });
    const like = new Like({
      user: req.userId,
      post: fetchedPost
    });
    const result = await like.save();
    return transformLike(result);
  },
  unlikePost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const like = await Like.findById(args.likeId).populate('post');
      const post = transformPost(like.post);
      await Like.deleteOne({ _id: args.likeId });
      return post;
    } catch (err) {
      throw err;
    }
  }
};
