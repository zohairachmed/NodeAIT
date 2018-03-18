'use strict';
const debug = require('debug')('mocks');

module.exports = {
    get: function (req, reply, next) {
        debug(`Logging in user: ${req.params.merchant}`);
        let merchant = req.params.merchant;
        let productID = req.params.productID;
        var response = {
            ConfirmHumanity: false,
            CaptchaPublicKey: '6LfiVREUAAAAABl1xMAKQrPCasScDGKqjQ5dZ5x1',
            ProductID: productID,
            Merchant: merchant
        };

        reply(response).code(200);
    }
};