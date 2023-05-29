const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;
const _ = require('lodash');

let books = [
  { name: 'Name 1', genre: 'Genre 1', id: '1' },
  { name: 'Name 2', genre: 'Genre 2', id: '2' },
  { name: 'Name 3', genre: 'Genre 3', id: '3' },
]

let authors = [
  { name: 'Author 1', age: 20, id: '1' },
  { name: 'Author 2', age: 30, id: '2' },
  { name: 'Author 3', age: 40, id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
       return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})