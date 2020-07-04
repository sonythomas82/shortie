let urls;
let prefix;

fetch("./urls.json")
    .then(function (urlData) {
        return urlData.json();
    })
    .then(function (urlJson) {
        urls = urlJson;
        prefix = urlJson["prefix"];
    });

var regex1 = "https*:\/\/" + prefix + "\/[a-zA-Z]+\/?"
// const regex = RegExp('https*:\/\/' + prefix + '\/[a-zA-Z]+\/?');
const regex = RegExp(regex1);


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        alert('prefix : ' + prefix); 
        if (regex.test(changeInfo.url)) {
            alert('URL Matches the Regex : ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '') + " -> " + urls["wiki"].url);
            chrome.tabs.update({
                url: urls[changeInfo.url.replace('/^https*:\/\/' + prefix + '\/|\/?$/g', '')].url
            });
        }
    }
});

// URLs
// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension