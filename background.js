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

var regex1 = "https*:\/\/go\/[a-zA-Z]+\/?"
// const regex = RegExp('https*:\/\/' + prefix + '\/[a-zA-Z]+\/?');
const regex = RegExp(regex1);


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // chrome.storage.local.set({
    //     'yt': 'https://en.wikipedia.org/wiki/Main_Page'
    // }, function () {
    //     // Notify that we saved.
    //     alert('URL saved');
    // });

    if (changeInfo.url) {
        alert('Listener Triggered : ' + prefix);
        if (regex.test(changeInfo.url)) {
            alert('URL Matches the Regex : ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, '') + " -> " + urls["wiki"].url);
            chrome.storage.local.get(['yt'], function (fullUrl) {
                alert('Key currently is ' + changeInfo.url.replace(/^https*:\/\/go\/|\/?$/g, ''));
                alert('Value currently is ' + fullUrl.key);
                chrome.tabs.update({
                    url: fullUrl.key
                });
            });
            // chrome.tabs.update({
            //     url: urls[changeInfo.url.replace('/^https*:\/\/' + prefix + '\/|\/?$/g', '')].url
            // });
        }
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