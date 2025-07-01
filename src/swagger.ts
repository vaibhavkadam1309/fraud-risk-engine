import swaggerJSDoc from 'swagger-jsdoc';


export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fraud Risk Engine API',
      version: '1.0.0',
      description: 'API to evaluate fraud risk and return risk level and LLM explanation',
    },
  },
  apis: ['./src/routes/*.ts'], // where Swagger looks for annotations
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
