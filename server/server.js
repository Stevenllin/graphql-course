const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();
app.use(cors())

require('dotenv').config();

mongoose.set('strictQuery', false);
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
