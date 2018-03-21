'use strict';
const Path = require('path');
const debug = require('debug')('records-index');

exports.register = function (server, options, next) {

    let swaggerizeHapi = require('swaggerize-hapi');
    swaggerizeHapi.register.attributes.name = 'swagger-records';
    server.register({
        register: swaggerizeHapi,
        options: {
            api: Path.resolve('./modules/records/config/swagger.json'),
            docspath: '/records/swagger',  // <-- base path from swagger is prepended
            handlers: Path.resolve('./modules/records/handlers')
        }
    });

    let hapiSwaggeredUi = require('hapi-swaggered-ui');
    server.register({
        register: hapiSwaggeredUi,
        options: {
            swaggerEndpoint: '/records/swagger',  // <-- from above with base path from swagger
            path: '/records/swagger-ui',
            title: 'Records API',
            swaggerOptions: {},
            auth: false
        }
    });


    next();
};
exports.register.attributes = {
    pkg: require('./package.json')
};