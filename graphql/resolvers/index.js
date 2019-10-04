const authResolver = require('./auth');
const postsResolver = require('./post');
const userResolver = require('./user');
const likeResolver = require('./like');

const rootResolver = {
  ...authResolver,
  ...postsResolver,
  ...userResolver,
  ...likeResolver
};

module.exports = rootResolver;
