let urls;
let prefix;

fetch("./urls.json")
    .then(function (urlData) {
        return urlData.json();
    })
    .then(function (urlJson) {
        urls = urlJson;
        urls["fsdgag"] = "testes3";
        prefix = urlJson["prefix"];
    });
/**
 * Get full URL using short URL from chrome local storage
 * @param {string} shortUrl 
 */
// function getURL(shortUrl) {
// var key = 'URLs';
// chrome.storage.local.get(key, function (result) {
// console.log('Full URL from function: ' + result[key][shortUrl]);
// return result[key][shortUrl];
// });
// }

function getURL(shortUrl) {
    var getURL = new Promise((resolve, reject) => {
        var key = 'URLs';
        chrome.storage.local.get(key, function (result) {
            // alert('Full URL: ' + result[key][shortUrl]);
            var URL = result[key][shortUrl];
            if (URL && URL != undefined) {
                console.log('Full URL from function: ' + result[key][shortUrl]);
                resolve(URL);
            } else
                resolve('chrome://newtab/');
        });
    })
    return getURL;
}

// var getURL = new Promise((resolve, reject) => {
//     var key = 'URLs';
//     chrome.storage.local.get(key, function (result) {
//         alert('Full URL: ' + result[key][shortUrl]);
//         var URL = result[key][shortUrl];
//         if (URL && URL != undefined)
//             resolve(URL);
//         else
//             resolve('chrome://newtab/');
//     });
// })



var regex1 = "https*:\/\/go\/[a-zA-Z]+\/?"
// const regex = RegExp('https*:\/\/' + prefix + '\/[a-zA-Z]+\/?');
const regex = RegExp(regex1);


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("onUpdate");

    // if (changeInfo.status == 'loading') {

    // }
    // if (changeInfo.url) {
    if (changeInfo.status == 'loading') {
        console.log('Listener Triggered ');
        // if (regex.test(changeInfo.url)) {
        // console.log('URL Matches the Regex : ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '') + " -> " + urls["wiki"].url);
        // chrome.storage.local.get(['yt'], function (fullUrl) {
        //     alert('Key currently is ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, ''));
        //     alert('Value currently is ' + fullUrl.key);
        //     chrome.tabs.update({
        //         url: fullUrl.key
        //     });
        // });
        // getURL(changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '')).then((URL) => {
        chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true
        }, function (tabs) {
            var url1 = tabs[0].url;
            console.log("Chrome URL: " + url1);
            if (regex.test(url1)) {
                // var fullUrl = getURL(url1.replace(/^https*:\/\/go\/|\/?$/g, ''))
                getURL(changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '')).then((URL) => {
                    console.log("UPDATE URL : " + URL);
                    chrome.tabs.update(tabs[0].id, {
                        url: 'https://www.youtube.com/'
                    });
                });
            }
        })
        // var fullUrl = getURL()
        // console.log("UPDATE URL : " + URL);
        // chrome.tabs.update(tabId, {
        //     url: URL
        // });
        // })
        // }
    }
});






// URLs
// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension

// To save to Sync 
// function saveChanges() {
//     // Get a value saved in a form.
//     var theValue = textarea.value;
//     // Check that there's some code there.
//     if (!theValue) {
//         message('Error: No value specified');
//         return;
//     }
//     // Save it using the Chrome extension storage API.
//     chrome.storage.sync.set({
//         'value': theValue
//     }, function () {
//         // Notify that we saved.
//         message('Settings saved');
//     });
// }