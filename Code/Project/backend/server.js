const app = require('./app')

const dotenv = require('dotenv');

//Setting up config file
dotenv.config({ path: 'Group03/Code/Project/backend/config/config.env' })

app.listen(process.env.PORT, () => {
  let x = process.env.PORT;
  let y = process.env.NODE_ENV;
  console.log('Server started on PORT: ' + x + ' in ' + y + ' mode.')
})