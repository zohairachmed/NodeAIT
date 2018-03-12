'use strict';
const Path = require('path');
const debug = require('debug')('authentication-index');

exports.register = function (server, options, next) {

    let swaggerizeHapi = require('swaggerize-hapi');
    swaggerizeHapi.register.attributes.name = 'swagger-authentication';
    server.register({
        register: swaggerizeHapi,
        options: {
            api: Path.resolve('./modules/authentication/config/swagger.json'),
            docspath: '/authentication/swagger',  // <-- base path from swagger is prepended
            handlers: Path.resolve('./modules/authentication/handlers')
        }
    });

    let hapiSwaggeredUi = require('hapi-swaggered-ui');
    server.register({
        register: hapiSwaggeredUi,
        options: {
            swaggerEndpoint: '/authentication/swagger',  // <-- from above with base path from swagger
            path: '/authentication/swagger-ui',
            title: 'Authentication API',
            swaggerOptions: {},
            auth: false
        }
    });


    next();
};
exports.register.attributes = {
    pkg: require('./package.json')
};