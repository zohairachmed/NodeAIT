'use strict';
const debug = require('debug')('mocks');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
    get: function (req, reply, next) {

        let url = req.query.url;
        var response = {
            minimumInventory: 0
        };

        
        debug(`About to load the url ${url}`);
        JSDOM.fromURL(url, {

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
        }).catch(error => {
            debug(`${error}`);
            reply().code(500);
            Ï
        });
    }
};