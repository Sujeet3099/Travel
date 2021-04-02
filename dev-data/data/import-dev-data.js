const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./../../model/tourModel');
const mongoose = require('mongoose');
dotenv.config({ path: './../../config.env' });

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

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));
// console.log(tours);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Loaded Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
