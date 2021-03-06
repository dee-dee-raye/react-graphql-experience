const Post = require('../../models/post');
const User = require('../../models/user');

const { transformPost } = require('./merge');

module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts.map(post => {
        return transformPost(post);
      });
    } catch (err) {
      throw err;
    }
  },
  createPost: async (args, req) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const post = new Post({
      description: args.postInput.description,
      imageUrl: args.postInput.imageUrl,
      date: new Date(args.postInput.date),
      creator: req.userId
    });
    console.log(post)
    let createdPost;
    try {
      const result = await post.save();
      console.log('save');
      createdPost = transformPost(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdPosts.push(post);
      await creator.save();
      console.log('creator save')
      return createdPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
