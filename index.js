'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({port: 3000});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    return reply('Hello from hapi');
  }
});

server.route({
  method: 'GET',
  path: '/json',
  handler: function(request, reply) {
    return reply({message: 'hellofromhapi'});
  }
});

server.register({
  register: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err;
  }

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('server is running at ', server.info.uri);
  });
});
