const authResolver = require('./auth');
const postsResolver = require('./post');
// const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...postsResolver,
 // ...bookingResolver
};

module.exports = rootResolver;
