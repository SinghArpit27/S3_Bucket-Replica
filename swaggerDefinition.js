import { userPaths } from "./doc/index.js";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "S3 Bucket APIs",
    description: "S3 Bucket APIs",
    contact: {
      name: "Debut Infotech",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      // description: "Version 1",
    },
  ],
  paths: {
    ...userPaths,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      }
    },
},
security: [
  {
    bearerAuth: []
  },
],
 
};