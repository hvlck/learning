// Sends data to Storage API from options page

// Updates storage data in UI and variables
let data;
window.addEventListener('load', function() {
    browser.storage.local.get(['alwaysOn', 'style']).then(function(response) {
        data = {
            alwaysOn: response.options || false,
            style: response.style || false
        };
        console.log(data)
    }).then(function() {
        setContentToStoredData();
    }).catch(function() {
        displayStatus('Failed to load extension data.  You may be new, or you just cleared your data.');
    });
});

// Automatically updates form elements with related data
function setContentToStoredData() {
    document.getElementById('always-run').checked = data.alwaysOn;
    document.querySelector('textarea').value = data.style;
    data.alwaysOn ? displayStatus('Stylesheet will be loaded on every page.') : displayStatus('Stylesheet will only be loaded on pages without any.');
}

// Updates Storage API options data and displays message in UI
document.getElementById('always-run').addEventListener('change', function(event) {
    setStorage({ "alwaysOn": event.target.checked })
    event.target.checked ? displayStatus('Stylesheet will be loaded on every page.') : displayStatus('Stylesheet will only be loaded on pages without any.');
});

// Updates Storage API style data and displays message in UI
document.querySelector('textarea').addEventListener('input', function() {
    setStorage({ "style": document.querySelector('textarea').value });
    displayStatus('Stylesheet updated!');
});

// Clears extension storage
document.getElementById('clear-data').addEventListener('click', function() {
    document.getElementById('always-run').checked = false;
    document.querySelector('textarea').value = '';
    browser.storage.local.clear();
    displayStatus('Data cleared!')
});

// Sets extension storage
function setStorage(data) {
    browser.storage.local.set(data);
}

// Sends a message in the UI
let statusElem = document.querySelector('#status');
function displayStatus(message) {
    statusElem.innerHTML = message;
    statusElem.classList.remove('hidden');
}