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

type Like {
  _id: ID!
  post: Post!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Comment {
  _id: ID!
  post: Post!
  user: User!
  comment: String!
  createdAt: String!
  updatedAt: String!
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
    user(userId: String!): User!
    likes: [Like!]!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    editUser(userInput: UserInputEdit): User
    likePost(postId: ID!): Like!
    unlikePost(likeId: ID!): Post!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
