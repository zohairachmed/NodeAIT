//https://www.fleetfarm.com/detail/curt-class-3-trailer-hitch-13119/0000000267946?bc=11928|11994|12001
'use strict';
const debug = require('debug')('fleetfarm');

module.exports = {
    get: function (req, reply, next) {

        let url = req.query.url;
        var apiResponse = {
            minimumInventory: -1
        };

        if (!url) {
            url = 'https://www.fleetfarm.com/detail/curt-class-3-trailer-hitch-13119/0000000267946?bc=11928|11994|12001'
        }

        const puppeteer = require('puppeteer');

        async function run() {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            var PLUS_SELECTOR = '#add-to-cart-form > div.product-qty > div > div > div.plus-icon > span';

            await page.goto(url, { waitUntil: ['networkidle2', 'load', 'domcontentloaded'], timeout: 10000 });

            try {
                await page.click(PLUS_SELECTOR);
                await page.click(PLUS_SELECTOR);
                await page.click(PLUS_SELECTOR);
                await page.click(PLUS_SELECTOR);
                await page.click(PLUS_SELECTOR);
                await page.click(PLUS_SELECTOR);
            }
            catch (error) {
                console.log('error on plus selector');
            }

            page.on('response', response => {
                try {
                    response.text().then(function (textBody) {

                        let jsonResponse = JSON.parse(textBody);
                        console.log(jsonResponse.success);
                        if (jsonResponse.success === "true") {
                            apiResponse.minimumInventory = 7;
                            return;
                        }

                        var errorMessage = jsonResponse.errorMessages[0];
                        var startingIndex = errorMessage.indexOf('available quantity') + 18;
                        var finalString = errorMessage.substr(startingIndex).replace('(', '').replace(')', '').replace('.', '');

                        console.log('final: ' + finalString);

                        apiResponse.minimumInventory = parseInt(finalString);

                    });
                }
                catch (error) {
                    console.log('error on response');
                }
            });

            await page.$eval('#add-to-cart-form', form => form.submit());

            await page.waitForNavigation();
            await page.screenshot({ path: 'screenshots/fleetfarm1.png' });

            reply(apiResponse).code(200);

            await page.close();
            await browser.close();
        }

        run();
    }
};