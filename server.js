'use strict';
const Glue = require('glue');
const Path = require('path');
const config = require('./modules/config');
const fs = require('fs');
const debug = require('debug')('server');
require('dotenv').config();

var tls;

var environmentJson = JSON.stringify(process.env);
debug(`Environment config: ${environmentJson}`);

if (process.env.TLS_ENABLED === 'true') {
    tls = {
        key: fs.readFileSync(Path.resolve('./ssl/server.key')),
        cert: fs.readFileSync(Path.resolve('./ssl/server.crt'))
    };
    debug('HTTPS enabled');
} else {
    tls = false;
    debug('HTTPS not enabled');
}

const environment = {
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 8049
    },
    ui: {
        host: process.env.UI_HOST || 'localhost',
        port: process.env.UI_PORT || 8050
    },
    ws: {
        port: process.env.WS_PORT || 8051
    }
};

const manifest = {
    server: {},
    connections: [{
        port: environment.api.port,
        tls: tls,
        labels: 'api',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language', 'origin', 'x-csrf-token', 'x-xsrf-token', 'crumb', 'token'],
                additionalHeaders: ['x-requested-with', 'cache-control'],
                credentials: true
            }
        }
    }],
    registrations: [{
        plugin: 'h2o2'
    },
    {
        plugin: 'inert'
    },
    {
        plugin: 'vision'
    },
    // {
    //     plugin: {
    //         register: './modules/mock-store'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/figaro-mocks'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/account'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mobile-edge'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mobile-edge-v0.2.0'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mocks/mobile-account'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mocks/mobile-activation'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mocks/mobile-auth'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mocks/mobile-billing'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/mocks/mobile-notification'
    //     }
    // },
    // {
    //     plugin: {
    //         register: './modules/cms-orchestrator'
    //     }
    // },
    {
        plugin: {
            register: './modules/authentication'
        }
    },
    {
        plugin: {
            register: './modules/inventory'
        }
    },
    {
        plugin: {
            register: './modules/records'
        }
    },
    // {
    //     plugin: {
    //         register: './modules/cnetloginedge'
    //     }
    // },
    // // figaro-core routes plugin
    // {
    //     plugin: './modules/figaro-core',
    //     options: {
    //         select: ['ui', 'api'],
    //         routes: {
    //             prefix: '/figaro-core'
    //         }
    //     }
    // },
    {
        plugin: {
            register: './modules/basic-proxy',
            options: {
                upstream_protocol: process.env.PROXY_UPSTREAM_PROTOCOL || 'https',
                upstream_url: process.env.PROXY_UPSTREAM_HOST || 'dev-tbd.net'
            }
        }
    },
    {
        plugin: 'blipp'
    }
    ]
};

const options = {
    relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {
    if (err) {
        throw err;
    }

    server.start(() => {
        debug('Server is running.');
    });
});