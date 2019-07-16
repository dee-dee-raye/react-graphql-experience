const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Post {
  _id: ID!
  description: String!
  date: String!
  creator: User!
  imageUrl: String!
}

type User {
  _id: ID!
  email: String!
  password: String
  userName: String
  profilePic: String
  createdPosts: [Post!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input PostInput {
  description: String!
  date: String!
  imageUrl: String!
}

input UserInput {
  email: String!
  password: String!
  userName: String!
  profilePic: String
}

input UserInputEdit {
  userId: String!
  email: String!
  userName: String!
  profilePic: String!
}

type RootQuery {
    posts: [Post!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    editUser(userInput: UserInputEdit): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
