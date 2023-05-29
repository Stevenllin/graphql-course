const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

require('dotenv').config();

mongoose.set('strictQuery', false);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('DB Connection is successful')
}).catch((error) => {
  console.log(error.message)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening');
});
