import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

export const SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team Craft API',
      description: 'Formation and management of work teams in collaborative environments.',
      version: '0.0.1',
    },
  },
  apis: [`${(path.join(__dirname), './src/presentation/routes/*')}`],
};

export const swaggerSpec = swaggerJSDoc(SwaggerOptions);
