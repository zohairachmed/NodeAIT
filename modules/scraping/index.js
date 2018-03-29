'use strict';
const Path = require('path');
const debug = require('debug')('inventory-index');

exports.register = function (server, options, next) {

    let swaggerizeHapi = require('swaggerize-hapi');
    swaggerizeHapi.register.attributes.name = 'swagger-scraping';
    server.register({
        register: swaggerizeHapi,
        options: {
            api: Path.resolve('./modules/scraping/config/swagger.json'),
            docspath: '/scraping/swagger',  // <-- base path from swagger is prepended
            handlers: Path.resolve('./modules/scraping/handlers')
        }
    });

    let hapiSwaggeredUi = require('hapi-swaggered-ui');
    server.register({
        register: hapiSwaggeredUi,
        options: {
            swaggerEndpoint: '/scraping/swagger',  // <-- from above with base path from swagger
            path: '/scraping/swagger-ui',
            title: 'Scraping API',
            swaggerOptions: {},
            auth: false
        }
    });


    next();
};
exports.register.attributes = {
    pkg: require('./package.json')
};