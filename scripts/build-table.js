function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
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

function generate() {
    var key = 'URLs';
    chrome.storage.local.get(key, function (result) {
        if (isJSON(result[key]) || result[key] != undefined) {
            let table = document.querySelector("table");
            let data = Object.keys(result[key][0]);
            generateTableHead(table, data);
            generateTable(table, result[key]);
        }
    });
}

generate();