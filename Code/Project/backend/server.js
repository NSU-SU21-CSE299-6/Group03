const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

const cloudinary = require('cloudinary')

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  let x = err.stack
  console.log('Error: ' + x)
  console.log('Shutting down server due to uncaught exception')
  process.exit(1)
})

//Setting up config file
dotenv.config({ path: 'Group03/Code/Project/backend/config/config.env' })

//Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
  let x = process.env.PORT;
  let y = process.env.NODE_ENV;
  console.log('Server started on PORT: ' + x + ' in ' + y + ' mode.')
})

// Handle unhandled promise rejections

process.on('unhandledRejection', err => {
  let x = err.message;
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1)
  })
})