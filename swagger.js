const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Team Project API',
    description: 'Media Library API for Movies and Actors'
  },
  // Setting host to null or an empty string allows Swagger to 
  // automatically use the domain it is currently being hosted on.
  host: 'cse341-team-project-2.onrender.com', 
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the output file
swaggerAutogen(outputFile, endpointsFiles, doc);