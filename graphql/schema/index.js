const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Post {
  _id: ID!
  description: String!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  userName: String
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
}

input UserInput {
  email: String!
  password: String!
  userName: String!
}

type RootQuery {
    posts: [Post!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
