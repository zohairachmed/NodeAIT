'use strict';
const Path = require('path');
const debug = require('debug')('server');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/inventory/{id}',
    handler: function (request, reply) {

        debug('In route get');

        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/inventory/walmart/{productId}',
    handler: function (request, reply) {
        debug('In route get /name');
        reply('Walmart: ' + encodeURIComponent(request.params.productId) + '!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});