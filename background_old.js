let URLs;

// fetch("./urls.json")
//     .then(function (urlData) {
//         return urlData.json();
//     })
//     .then(function (urlJson) {
//         URLs = urlJson;
//     });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({
            'active': true,
            'currentWindow': true
        }, function (tabs) {
            if (tabs[0].url) {
                var url = tabs[0].url;
                if (/http(s)*:\/\/go\/.*/.test(url)) {
                    console.log('I was here: ' + URLs[url.replace(/http(s)*:\/\/go\//, "").replace(/\//, "")]);
                    console.log("Full URL")
                    chrome.tabs.update(tabs.id, {
                        url: URLs[url.replace(/http(s)*:\/\/go\//, "").replace(/\//, "")]
                    });
                }
            }
        });
    }
})

/**
 * Get full URL using short URL from chrome local storage
 * @param {string} shortUrl 
 */
function getURL(shortUrl) {
    var key = 'URLs';
    chrome.storage.local.get(key, function (result) {
        console.log('Full URL:' + result[key][shortUrl]);
        return result[key][shortUrl];
    });
}