import swaggerAutogen from 'swagger-autogen';
import User from './models/userModel.js';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Tecnologias emergentes',
    description: 'Documentação da API criada em sala',
  },
  servers: [
    {
      url: 'http://localhost:4040/',
    }
  ],
  components: {
    schemas: {
      InternalServerError: {
        code: '',
        message: '',
      },
      Login: {
        email: '',
        password: '',
      },
      User: {
        name : '',
        email : '',
        password : '',
      },
      Product: {
        name : '',
        description : '',
        stock : 0,
        price : 0,
      },
      Task: {
        description : '',
        done : false,
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    },
  },
};

const outputFile = './config/swagger.json';
const endpointsFiles = ['./routes.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
  .then(async () => {
    await import('./server.js');
});
