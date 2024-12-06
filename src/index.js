require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/index');

// Middleware and parsing
app.use(express.json());


// Mount routes
app.use('/', routes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


