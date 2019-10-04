const User = require('../../models/user');

const { transformUser } = require('./merge');

module.exports = {
editUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      console.log(args.userInput.userName);
      const existingUser = await User.findById(args.userInput.userId);
      if (!existingUser) {
        throw new Error('User does not exist.');
      }

      const user = {
        email: args.userInput.email,
        userName: args.userInput.userName,
        profilePic: args.userInput.profilePic
      };
      console.log(user);
      const query = {'_id': args.userInput.userId};
      result = await User.findOneAndUpdate(query, user, {new:true});

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  user: async ({userId}) => {
   return transformUser(userId);
  }
};