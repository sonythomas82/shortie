/**
 * Chrome listener to check when URL is updated
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({
            'active': true,
            'currentWindow': true
        }, function (tabs) {
            if (tabs[0] && tabs[0].url) {
                var url = tabs[0].url;
                if (/http(s)*:\/\/go\/.*/.test(url)) {
                    updateChromeUrl(tabs[0].id, url.replace(/http(s)*:\/\/go\//, "").replace(/\//, ""));
                }
            }
        });
    }
})

/**
 * Get full URL using short URL from chrome local storage
 * @param {Number} tabId 
 * @param {String} shortUrl 
 */
function updateChromeUrl(tabId, shortUrl) {
    var key = 'URLs';
    chrome.storage.local.get(key, function (result) {
        if (result[key][shortUrl]) {
            chrome.tabs.update(tabId, {
                url: result[key][shortUrl]
            });
        }
    });
}