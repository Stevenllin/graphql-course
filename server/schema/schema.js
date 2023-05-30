const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

let books = [
  { name: 'Name 1', genre: 'Genre 1', id: '1', authorId: '1' },
  { name: 'Name 2', genre: 'Genre 2', id: '2', authorId: '2' },
  { name: 'Name 3', genre: 'Genre 3', id: '3', authorId: '3' },
  { name: 'Name 4', genre: 'Genre 4', id: '4', authorId: '2' },
  { name: 'Name 5', genre: 'Genre 5', id: '5', authorId: '3' },
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
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})