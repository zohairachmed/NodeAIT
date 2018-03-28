'use strict';
const debug = require('debug')('mocks');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
    get: function (req, reply, next) {
        debug(`Logging in user: ${req.params.merchant}`);
        let merchant = req.params.merchant;
        let productID = req.params.productID;
        var response = {
            ProductID: productID,
            Merchant: merchant,
            minimumInventory: 0
        };

        if (merchant === "walmart") {

        }
//https://www.walmart.com/ip/LEGO-Star-Wars-TM-BB-8-75187/163329791
        debug(`About to load the url`);
        JSDOM.fromURL("https://www.walmart.com/ip/Halloween-Bottle/358304036", {

            referrer: "https://google.com/",

            userAgent: "Mellblomenator/9000",
            includeNodeLocations: true
        }).then(dom => {
            debug(`Time to cerealize`);
            var document = dom.serialize();

            debug(`Serialization is done. About to load the doc`);

            var ch = cheerio.load(document, { decodeEntities: true });

            let totalNumberOfItems = 0;

            ch(".visuallyhidden option").each(function (i, elem) {
                if (!isNaN(ch(elem).val())) {
                    debug(`Item  ${i}: ${ch(elem).val()}`);
                    totalNumberOfItems += 1;
                }
            });

            debug(`Total number of items: ${totalNumberOfItems}`);

            response.minimumInventory = totalNumberOfItems;

            reply(response).code(200);

            //debug(`Quantity: ${ch('#read-more')}`);


            //debug(`URL: ${options.uri}`);
            //debug(`Bullet Points: ${ch('#fbExpandableSectionContent').children().html().trimLeft().trimRight()}`);
            // ch('#fbExpandableSectionContent').find('.a-list-item').each(function (i, elem) {

            //     debug(`Bullet  ${i}: ${ch(elem).html().trim()}`);
            // });
            // debug(`Description: ${ch('#productDescription').html().trim()}`);
            // debug(`SalesRank: ${ch('#SalesRank').html().trim()}`);
        });
    }
};