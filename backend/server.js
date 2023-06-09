require('dotenv').config()

// require packages
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');

// express app
const app = express()

// require swagger api
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, './api-docs/openapi.yaml'));

// Serve Swagger UI at a specific route, e.g., '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  // Catch-all route to serve the frontend's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
else{
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

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
