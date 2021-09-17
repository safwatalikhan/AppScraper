var fs = require('fs')
fs.appendFile('list.csv', "Title;AppID;URL;Installs (number+);Rating (out of 5);Number of Ratings;Number of Reviews;Price;Last Updated;Version\n", function(err) {
    if (err) {
        // append failed
    } else {
        // done
    }
})
var gplay = require('google-play-scraper');

var result = gplay.search({
    term: "travel apps",
    pricetext: "free",

    num: 40
});
let appIds = []
let appDetails = []
var p = Promise.resolve(result);
p.then(function(v) {
    for (var i = 0; i < 40; i++) {
        var objId = v[i];
        appIds.push(objId.appId);
    }
    for (var j = 0; j < 20; j++) {
        var app = appIds[j];
        result2 = gplay.app({
            appId: appIds[j]
        });
        var q = Promise.resolve(result2);
        q.then(function(w) {
            updated = changeToDate(w.updated)
            var content = w.title + ";" + w.appId + ";" + w.url + ";" + w.installs + ";" + w.score + ";" + w.ratings + ";" + w.reviews + ";" + w.priceText + ";" + updated + ";" + w.version + "\n";

            fs.appendFile('list.csv', content, function(err) {
                if (err) {
                    // append failed
                } else {
                    // done
                }
            })
        });
    }


});

function changeToDate(timestamp) {

    var date = new Date(timestamp);
    return date;
}