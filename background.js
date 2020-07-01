const regex = RegExp('https*:\/\/go\/[a-zA-Z]+\/?');
let urls;

fetch("./urls.json")
    .then(function (urlData) {
        return urlData.json();
    })
    .then(function (urlJson) {
        urls = urlJson;
    });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (regex.test(changeInfo.url)) {

            alert('URL Matches the Regex : ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '') + " -> " + urls["wiki"].url);

            // chrome.tabs.update({url:"http://en.wikipedia.org"});
            chrome.tabs.update({
                url: urls[changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '')].url
            });


        }
    }
    // chrome.tabs.query({
    //     active: true,
    //     lastFocusedWindow: true
    // }, tabs => {
    //     let url = tabs[0].url;
    // alert('Hello, World!' + url);
    // use `url` here inside the callback because it's asynchronous!
    // });
});

// URLs
// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension