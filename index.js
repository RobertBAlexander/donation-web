/**
 * Created by Robert Alexander on 19/09/2017.
 */
'use strict';

const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 7000 });

const initUsers = {
  'homer@simpson.com': {
    firstName: 'Homer',
    lastName: 'Simpson',
    email: 'homer@simpson.com',
    password: 'secret',
  },
  'bart@simpson.com': {
    firstName: 'Bart',
    lastName: 'Simpson',
    email: 'bart@simpaon.com',
    password: 'secret',
  },
};

//server.bind({
//   currentUser: {},
//   users: initUsers,
//   donations: [],
//});
require('./app/models/db');

server.register([require('inert'), require('vision'), require('hapi-auth-cookie')], err => {

  if (err) {
    throw err;
  }

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  server.auth.strategy('standard', 'cookie', {
    password: 'secretpasswordnotrevealedtoanyone',
    cookie: 'donation-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/login',
  });

  server.auth.default({
    strategy: 'standard',
  });

  server.route(require('./routes'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });
});