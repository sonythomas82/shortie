'use strict';

function updateUrl() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        document.getElementById("fullUrl").value = tabs[0].url;
    });
}

function addToJson() {
    document.getElementById('textbox_id').value
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Update URL to be called");
    updateUrl();
});



document.getElementById("addNewUrl").addEventListener("click", saveUrl);

function saveUrl() {
    // Get a value saved in a form.
    // console.log("Url to be saved");

    var fullUrl = (document.getElementById('fullUrl').value).toString();
    var shortUrl = (document.getElementById('shortUrl').value).toString();


    alert("Full Url : " + fullUrl);
    alert("Short Url : " + shortUrl);
    // // Check that there's some code there.
    // if (!fullUrl || !shortUrl) {
    //     alert('Error: No value specified');
    //     return;
    // }
    // // Save it using the Chrome extension storage API.
    // chrome.storage.local.set({
    //     'yt': 'hgfdhgfdhgfhfd'
    // }, function () {
    //     // Notify that we saved.
    //     alert('URL saved');
    // });

    // var key = 'a'.shortUrl;
    var resultsArray = fullUrl.toString();

    chrome.storage.local.set({
        shortUrl: fullUrl
    }, function () {
        // Notify that we saved.
        alert('URL saved');
    });

    chrome.storage.local.set({
        'results': []
    });

    var result = {
        shortUrl: fullUrl
    };

    // next we will push each individual results object into an array
    chrome.storage.local.get('results', function (item) {
        item.results.push(result);
        chrome.storage.local.set({
            'results': item.results
        });
    });

    chrome.storage.local.get('results', function (item) {
        alert(" Value -> " + item.results)
    });


    // chrome.storage.local.set({
    //     shortUrl: fullUrl
    // });

    // chrome.storage.local.set({
    //     shortUrl: fullUrl
    // }, function () {
    //     // Notify that we saved.
    //     alert('URL saved');
    // });
    var key = 'yt'
    chrome.storage.local.set({
        key: resultsArray
    });

    chrome.storage.local.get(key, function (result) {
        alert('result: ' + result[key]);
    });

    var value = "TEst 2"

    // chrome.storage.local.set({
    //     yt: value
    // }, function () {
    //     alert('Value is set to ' + value);
    // });

    // chrome.storage.local.get(shortUrl, function (result) {
    //     alert('Value currently is ' + result.shortUrl);
    //     console.debug('Value currently is ' + result.toString());
    // });
}

// function Load(Id) {
//     var key = Id.toString();
//     key = 'a'.key;
//     chrome.storage.local.get(key, function (result) {
//         console.debug('result: ', result.key);
//     });
// }