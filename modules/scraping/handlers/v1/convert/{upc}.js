'use strict';
const debug = require('debug')('mocks');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
    get: function (req, reply, next) {
        //debug(`Logging in user: ${req.params.merchant}`);
        //let merchant = req.params.merchant;
        let upc = req.params.upc;
        var response = {
            asin: [],
            url: ''
        };

        var preUrl = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=";

        // if (merchant === "amazon") {
        //     preUrl = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=";
        // }

        if (!upc) {
            upc = "724742007638";
        }

        var productUrl = preUrl + upc;

        debug(`About to load the url: ${productUrl}`);
        JSDOM.fromURL(productUrl, {

            referrer: "https://google.com/",

            userAgent: "Mellblomenator/9000",
            includeNodeLocations: true
        }).then(dom => {
            debug(`Time to cerealize`);
            var document = dom.serialize();

            debug(`Serialization is done. About to load the doc`);

            var ch = cheerio.load(document, { decodeEntities: true });


            ch('#s-results-list-atf li').each(function (i, elem) {
                var asin = ch(elem).attr('data-asin');
                debug(`li:  ${i}: ${asin}`);
                response.asin.push(asin);
            });

            debug(`All done`);
            

            reply(response).code(200);
        }).catch(error => {
            debug(`ERROR: ${error}`);
            reply().code(500);
        });
    }
};