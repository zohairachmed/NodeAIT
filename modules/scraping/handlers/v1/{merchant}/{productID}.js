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
            title: '',
            price: 0,
            salesRank: ''
        };

        var preUrl = "https://www.amazon.com/dp/";

        if (merchant === "amazon") {
            preUrl = "https://www.amazon.com/dp/";
        }

        if (!productID) {
            productID = "B002DYJ1D8";
        }

        var productUrl = preUrl + productID;

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
            let title = response.title = ch('#productTitle').html().trim();

            debug(`Title: ${title}`);

            let price = response.price = ch('.a-color-price').html().trim();

            debug(`Price: ${price}`);
            
            // ch('#fbExpandableSectionContent').find('.a-list-item').each(function (i, elem) {
                
            //     debug(`Bullet  ${i}: ${ch(elem).html().trim()}`);
            // });
            // debug(`Description: ${ch('#productDescription').html().trim()}`);
            var salesRankHtml = ch('#SalesRank').html().trim();
            var startingIndex = salesRankHtml.indexOf('</b>') + 5;
            
            var withoutBr = salesRankHtml.substr(startingIndex);

            var endingIndex = withoutBr.indexOf('(<a');

            var finalRanking = withoutBr.substr(0, endingIndex)

            finalRanking = finalRanking.replace(/\r?\n?/g, '').trim();

            debug(`SalesRank: ${finalRanking}`);


            response.salesRank = finalRanking;

            reply(response).code(200);
        });
    }
};