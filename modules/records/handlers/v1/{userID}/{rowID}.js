'use strict';
const debug = require('debug')('mocks');

module.exports = {
    get: function (req, reply, next) {
        debug(`Logging in user: ${req.params.userID}`);
        
        let userID = req.params.userID;
        let rowID = req.params.rowID;
        var response = {
            ConfirmHumanity: false,
            CaptchaPublicKey: '6LfiVREUAAAAABl1xMAKQrPCasScDGKqjQ5dZ5x1',
            UserID: userID,
            rowID: rowID,
            
        };

        reply(response).code(200);
    }
};