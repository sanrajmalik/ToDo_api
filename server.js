const express = require('express');
const connectDb= require('./dbCon')
const authRoutes = require('./Routes/userRoute');
const todoRoutes = require('./Routes/toDoRoute');
const authenticate = require('./Middlewares/authenticate');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();


connectDb();
app.use(bodyParser.json());


app.use('/auth', authRoutes);
// app.js
app.use('/todos', todoRoutes);


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Todo App API',
        version: '1.0.0',
        description: 'API documentation for the Todo App',
      },
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    apis: ['./Routes/*.js'], // Path to the API routes
  }

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



  app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})

// app.use(cors);
