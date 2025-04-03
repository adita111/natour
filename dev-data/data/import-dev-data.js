const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

dotenv.config(); // Load .env variables
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => console.error('❌ DB connection error:', err));

////// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//// Import data into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(err);
  }

  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(err);
    console.log('Data successfully deleted!');
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
