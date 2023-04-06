require('dotenv').config()

// require packages
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')
const bodyParser = require('body-parser');

// ChatGPT said to include this for build, but it breaks the local host
// --------------------------------------------
// const path = require('path');

// // Serve static files from the frontend build folder
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Catch-all route to serve the frontend's index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });
// --------------------------------------------

// express app
const app = express()
app.use(cors());
app.use(bodyParser.json());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
