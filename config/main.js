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
  apiUrl: '',
  // Insert CDN url here (cloudfront) to correct the path that server.js uses on lambda.
  cdn: '',
};

module.exports = config;
