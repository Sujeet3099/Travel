const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASS,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DATABASE connected.`));

const port = 3000;
app.listen(port, () => console.log(`Listening to Port ${port} ....`));
