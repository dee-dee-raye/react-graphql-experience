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
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    const post = new Post({
      description: args.postInput.description,
      imageUrl: args.postInput.imageUrl,
      date: new Date(args.postInput.date),
      creator: '5d2912b47ec4a93539526b57'
    });
    console.log(post.imageUrl)
    let createdPost;
    try {
      const result = await post.save();
      createdPost = transformPost(result);
      console.log(createdPost);
      const creator = await User.findById('5d2912b47ec4a93539526b57');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdPosts.push(post);
      await creator.save();

      return createdPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
