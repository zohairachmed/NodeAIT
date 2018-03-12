'use strict';
const debug = require('debug')('mocks');

module.exports = {
    get: function (req, reply, next) {
        var response = {
            ConfirmHumanity: false,
            CaptchaPublicKey: '6LfiVREUAAAAABl1xMAKQrPCasScDGKqjQ5dZ5x1'
        };

        reply(response).code(200);
    },
    post: function (req, reply, next) {
        //Check for non-empty username and password
        if ((!req.payload.Username || 0 === req.payload.Username.length) && (!req.payload.Password || 0 === req.payload.Password.length)) {
            //Return 403 if username or password is empty.
            let failed = {
                Status: "FAILED"
            };
            reply(failed).code(403);
        } else {
            debug(`Logging in user: ${req.payload.Username}`);

            let statusErrors = ['CAPTCHA_REQUIRED', 'IP_LOCKED', 'INVALID_CREDS', 'INVALID_CREDS11', 'ERROR']

            let responseStatus = '';
            let attemptNumber = 1;

            if (req.payload.Password.length > 0) {
                let pass = req.payload.Password.toUpperCase();
                let errorIndex = statusErrors.indexOf(pass);
                if (errorIndex >= 0) {
                    responseStatus = statusErrors[errorIndex];
                }

                if (responseStatus.indexOf('11') > 0) {
                    responseStatus = responseStatus.substring(0, responseStatus.indexOf('1'));
                    attemptNumber = 11;
                }
            }

            if (responseStatus.length > 0) {
                var response = {
                    Status: responseStatus,
                    Username: req.payload.Username,
                    PartnerType: 'CHARTER',
                    AttemptNumber: attemptNumber,
                    Action: '',
                    LCharterSession: '',
                    errors: [],
                    statusCode: 200,
                    transactionId: '',
                    dateTime: new Date().toISOString()
                };

                reply(response).state('authData', {
                    token: ''
                }).code(200);
            }
            else {
                reply("").state('authData', {
                    token: ""
                }).code(200);
                // MockStore.authenticateUser(req)
                //     .then(token => {
                //         //Set the sessionId to the token
                //         //TODO: Is this right?
                //         var session = {
                //             SessionId: token
                //         };

                //         // Response:
                //         // Status	            string	            optional
                //         // ErrorPage	         string	            optional
                //         // Username	            string	            optional
                //         // PartnerType	         string	            optional
                //         // AttemptNumber	      integer (int32)	   optional
                //         // Action	            string	            optional
                //         // LCharterSession	   LCharterSession	   optional
                //         // errors	            array[Error]	      optional
                //         // statusCode	         integer (int32)	   optional
                //         // transactionId	      string	            optional
                //         // dateTime	            string (date-time)	optional

                //         //Create the response.
                //         var response = {
                //             Status: "SUCCESS",
                //             Username: req.payload.Username,
                //             PartnerType: 'CHARTER',
                //             AttemptNumber: 1,
                //             Action: '',
                //             LCharterSession: session,
                //             errors: [],
                //             statusCode: 200,
                //             transactionId: '',
                //             dateTime: new Date().toISOString()
                //         };

                //         reply(response).state('authData', {
                //             token: token
                //         }).code(200);
                //     })
                //     .catch(error => {
                //         reply(error).code(500);
                //     });
            }
        }
    }
};