const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncought Exception');
  console.log(err.name, err.mesage);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

dotenv.config(); // Load .env variables
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => console.log('❌ DB connection error:', err));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandle Rejection');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
