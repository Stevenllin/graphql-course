const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const _ = require('lodash');

let books = [
  { name: 'Name 1', genre: 'Genre 1', id: '1' },
  { name: 'Name 2', genre: 'Genre 2', id: '2' },
  { name: 'Name 3', genre: 'Genre 3', id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
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
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})