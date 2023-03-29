require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')
const bodyParser = require('body-parser');

const path = require('path');


// const PORT = process.env.PORT || 5001;
// app.set('port', (process.env.PORT || 5001));
// const url = process.env.MONGODB_URI;


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
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(url);
// client.connect(console.log("Mongo DB connected!"));

// // const url = process.env.MONGODB_URI;
// // const mongoose = require("mongoose");
// // mongoose.connect(url)
// //   .then(() => console.log("Mongo DB connected!"))
// //   .catch(err => console.log(err));

// var api = require('./api.js');
// api.setApp(app, client);
// // api.setApp(app, mongoose);


// // routes
// app.use('/api/workouts',workoutRoutes)
// app.use('/api/user',workoutRoutes)


// // connect to db
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log('connected to db & listening on port', process.env.PORT)
//   })
// })
// .catch((error) => {
//   console.log(error)
// })

// // middleware
// app.use(express.json())
// app.use((req, res, next) => {
//   console.log(req.path,req.method)
//   next()
// })

// if (process.env.NODE_ENV === 'production') 
// {
//   // Set static folder
//   app.use(express.static('frontend/build'));


//   app.get('*', (req, res) => 
//   {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// }

// app.use((req, res, next) => 
// {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// app.listen(PORT, () => 
// {
//   console.log('Server listening on port ' + PORT);
// });
