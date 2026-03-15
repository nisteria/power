// OpenAPI/Swagger Config
export const swaggerConfig = {
  openapi: {
    info: {
      title: 'Power Energy API',
      description: 'API for intelligent energy management',
      version: '1.0.0',
      contact: {
        name: 'Power Support',
        email: 'support@power.energy',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development',
      },
      {
        url: 'https://api.power.energy',
        description: 'Production',
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Customer', description: 'Customer management' },
      { name: 'SmartMeter', description: 'Smart meter data' },
      { name: 'Devices', description: 'Device control' },
      { name: 'Optimization', description: 'AI optimization' },
      { name: 'Billing', description: 'Invoices and payments' },
      { name: 'Webhooks', description: 'Webhook management' },
    ],
  },
};
