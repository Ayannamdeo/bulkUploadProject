import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Backend API Documentation',
    },
  },
  // servers: [
  //   {
  //     url: 'http://localhost:8080', // Replace with your base URL
  //     description: 'Local server',
  //   },
  // ],
  apis: ['./server/src/modules/**/*.ts'], // Point to your controller files for JSDoc
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export {swaggerDocs, swaggerUi};
