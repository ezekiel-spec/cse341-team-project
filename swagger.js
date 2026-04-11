const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Team Project API',
    description: 'Media Library API for Movies and Actors'
  },
  host: 'cse341-team-project.onrender.com', // Replace with your actual Render URL
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);