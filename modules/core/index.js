'use strict';

const Debug = require('debug')('core-index')
const config = require('./config')

//Local Imports
const userHandler = require('./handlers/user')
const mockHandler = require('./handlers/mock')

//Models
const API = require('../../data/models/API')


exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/core/healthcheck',
        config: {
            auth: false,
            pre: [],
            handler: function(request, reply) { //Todo: Healtcheck should check Mongo connection once that is a dependency 
                Debug("Healthcheck Called")
                // API.findOne({})
                //     .exec((err, authOption) => {
                //         if (err) {
                //             Debug(err)
                //             reply(error).code(503)
                //         } else {
                            
                //             let oBjResponse = new Object();
                //             oBjResponse['message'] = 'up and running! Docs at https://oas-ui.figaro.spectrumtoolbox.com';
                //             oBjResponse['spcProxyHost'] = process.env.PROXY_HOST ? process.env.PROXY_HOST : 'PROXY_HOST not defined';
                //             oBjResponse['careProxyHost'] = process.env.CARE_PROXY_HOST ? process.env.CARE_PROXY_HOST :'CARE_PROXY_HOST not defined';
                //             oBjResponse['BillingProxyHost'] = process.env.BILLING_PROXY_HOST ? process.env.BILLING_PROXY_HOST :'BILLING_PROXY_HOST not defined';
                //             oBjResponse['ConcurrentUserSessions'] = process.env.CONCURRENT_USER_SESSIONS ? process.env.CONCURRENT_USER_SESSIONS :'CONCURRENT_USER_SESSIONS not defined';
                            
                //             return reply(oBjResponse);
                //         }
                //     })
            }
        }
    })
    // server.route({
    //     method: 'POST',
    //     path: '/core/figaro/data/api',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             mockHandler.createMock(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'GET',
    //     path: '/core/figaro/data/user/{username}',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             userHandler.getMocksForUser(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'POST',
    //     path: '/core/figaro/data/searchreq',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             mockHandler.searchMocksByRequest(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'GET',
    //     path: '/core/figaro/data/user/session/{username}',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             userHandler.getSessionForUser(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'DELETE',
    //     path: '/core/figaro/data/user/sessiondelete/{username}',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             userHandler.deleteSessionForUser(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'DELETE',
    //     path: '/core/figaro/data/mock/{mockId}',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             mockHandler.deleteMock(request, reply)
    //         }
    //     }
    // })
    // server.route({
    //     method: 'PUT',
    //     path: '/core/figaro/data/mock/{mockId}',
    //     config: {
    //         auth: false,
    //         pre: [],
    //         handler: function(request, reply) {
    //             mockHandler.editMock(request, reply)
    //         }
    //     }
    // })

    next()
};

exports.register.attributes = {
    pkg: require('./package.json')
};