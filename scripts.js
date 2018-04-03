

function myFunction() {

    // Opens SS by its ID

    var ss = SpreadsheetApp.openById("1zB9WBA0qsXuvfYJTQVeEi9TLKGC6pk5Bw9s-YxSsXeA");

    // Get the name of this SS

    var name = ss.getName(); // Not necessary 

    var numRows = ss.getLastRow();

    Logger.log(numRows);

    var sheet = ss.getSheetByName('Sheet1'); // or whatever is the name of the sheet 

    numRows = 20;

    for (var i = 5; i <= numRows; i++) {

        var range = sheet.getRange(i, 3);
        var data = range.getValue();
        Logger.log(data);
        if (data) {
            var withoutDashes = '';
            withoutDashes = data.replace('-', '').replace('-', '').replace('-', '').replace('-', '').replace('-', '');
            Logger.log(withoutDashes);
        }


        //fill in data from the api
        var range = sheet.getRange(i, 11);
        range.setValue(withoutDashes);

        //get data from the api
        var url = "https://heroku-node-ait.herokuapp.com/scraping/v1/convert/" + withoutDashes;
        Logger.log('calling url ' + url);
        var response = UrlFetchApp.fetch(url, {
            'muteHttpExceptions': true
        });

        // Make request to API and get response before this point.
        var json = response.getContentText();
        var resData = JSON.parse(json);

        Logger.log(resData.asin);

        var asins = resData.asin;
        if (asins) {
            for (var j = 0; j < asins.length; j++) {

                var colNo = 12 + j;
                Logger.log(colNo);
                //fill in data from the api
                var upcRange = sheet.getRange(i, colNo);
                upcRange.setValue(asins[j]);


            }
        }


    }
} 