const config = {
  env: (process && process.env.NODE_ENV) ? process.env.NODE_ENV : 'development',
  host: (process && process.env.HOST) ? process.env.HOST : '0.0.0.0',
  port: (process && process.env.PORT) ? process.env.PORT : 8080,
  karmaPort: 9876,

  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      title: 'App',
      titleTemplate: 'App: %s',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
      ],
    },
  },


  // Deploy settings
  bucket: 'blrplt',
  apiUrl: '',
  cdn: 'https://d2df17k7nuk10m.cloudfront.net/',
};

module.exports = config;
