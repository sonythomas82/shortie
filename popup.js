'use strict';

/**
 * Get update URL from chrome tab and update to URL text field
 */
function updateUrl() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        document.getElementById("fullUrl").value = tabs[0].url;
    });
}

// function addToJson() {
// document.getElementById('textbox_id').value;
// }

/**
 * Listener to trigger UpdateUrl() to update fullUrl text field
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log("Update URL to be called");
    updateUrl();
});

/**
 * Event listener for Add button
 */
document.getElementById("addNewUrl").addEventListener("click", saveUrl);

/**
 * Get full and short URL from textfield
 */
function saveUrl() {
    var fullUrl = (document.getElementById('fullUrl').value).toString();
    var shortUrl = (document.getElementById('shortUrl').value).toString();

    addURL(shortUrl, fullUrl);
}


/**
 * Get full URL using short URL from chrome local storage
 * @param {string} shortUrl 
 */
// function getURL(shortUrl) {
    // var key = 'URLs';
    // chrome.storage.local.get(key, function (result) {
        // alert('Full URL:' + result[key][shortUrl]);
        // return result[key][shortUrl];
    // });
// }

/**
 * Add full and short URL to the chrome local storage
 * @param {string} shortUrl 
 * @param {string} fullUrl 
 */
function addURL(shortUrl, fullUrl) {
    var key = 'URLs';

    chrome.storage.local.get(key, function (result) {
        if (isJSON(result[key]) && result[key] != undefined) {
            result[key][shortUrl] = fullUrl;
        } else {
            result = {};
            var obj = {};

            obj[shortUrl] = fullUrl;

            result[key] = obj;
        }
        chrome.storage.local.set(result);
        // alert('URL saved: ' + JSON.stringify(result));
    });
}

/**
 * Returns true if JSON object
 * @param {*} data 
 */
function isJSON(data) {
    try {
        JSON.stringify(data);
        return true;
    } catch (e) {
        return false;
    }
}