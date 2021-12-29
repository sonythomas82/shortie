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
 * Add full and short URL to the chrome local storage
 * @param {string} shortUrl 
 * @param {string} fullUrl 
 */
function addURL(shortUrl, fullUrl) {
    var key = 'URLs';

    chrome.storage.local.get(key, function (result) {
        if (!isJSON(result[key]) || result[key] == undefined) {
            result = {};
            var obj = [{
                'shortUrl': shortUrl,
                'fullUrl': fullUrl,
                'viewCounter': 0
            }];
            result[key] = obj;
        } else if (isContains(result[key], shortUrl)) {
            result[key] = replaceByValue(result[key], 'shortUrl', shortUrl, 'fullUrl', fullUrl)
        } else {
            var obj = {
                'shortUrl': shortUrl,
                'fullUrl': fullUrl,
                'viewCounter': 0
            };
            result[key].push(obj);
        }
        chrome.storage.local.set(result);
    });
}

/**
 * The function searches over the array by certain field value,
 * and replaces occurences with the parameter provided.
 *
 * @param string field Name of the object field to compare
 * @param string oldvalue Value to compare against
 * @param string newvalue Value to replace mathes with
 */
function replaceByValue(json, field, value, newfield, newvalue) {
    for (var k = 0; k < json.length; ++k) {
        if (value == json[k][field]) {
            json[k][newfield] = newvalue;
        }
    }
    return json;
}

/**
 * Returns true if value is present in JSON
 * @param {JSONObject} items 
 * @param {string} value 
 * @returns booleam
 */
function isContains(items, value) {
    var contains = false;

    items.forEach(item => {
        if (item['shortUrl'] != undefined && item.shortUrl == value) {
            contains = true;
        }
    });

    return contains
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

/**
 * Event listener for Settings button
 */
document.getElementById("viewSettings").addEventListener("click", openUrlView);

/**
 * Open urlView HTML page in new tab
 */
function openUrlView() {
    chrome.tabs.create({
        url: chrome.runtime.getURL("urlView.html")
    });
}