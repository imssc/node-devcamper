const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load Models
const Bootcamps = require('./models/Bootcamps');
const Course = require('./models/Course');
const User = require('./models/User');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

//Import the data  into the db
const importData = async () => {
  try {
    await Bootcamps.create(bootcamps);
    await Course.create(courses);
    await User.create(users);

    console.log(`Data imported........`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete the data from the DB
const deleteData = async () => {
  try {
    await Bootcamps.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    console.log(`Data Destroyed........`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === 'import') {
  importData();
} else if (process.argv[2] === 'destroy') {
  deleteData();
}
