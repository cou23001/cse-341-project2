const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Users API',
      description: 'Users API'
    },
    host: 'project2-ljbc.onrender.com',
    schemes: ['https']
  };
  
  const outputFile = './swagger.json';
  const endPointFiles = ['./routes/index.js'];
    
  swaggerAutogen(outputFile, endPointFiles, doc);