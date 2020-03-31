// Sends data to Storage API from options page

document.querySelector('textarea').addEventListener('input', function() {
    browser.storage.local.set({
        "style": document.querySelector('textarea').value
    });

    browser.runtime.sendMessage({
        status: 'Stylesheet updated!'
    }).then(function(){ 
        displayStatus('Stylesheet updated!');
    }).catch(function(err) {
        console.error(err);
    });
});

let statusElem = document.querySelector('#status');
function displayStatus(message) {
    statusElem.innerHTML = message;
    statusElem.classList.remove('hidden');
    setTimeout(timeout => {
        statusElem.classList.add('hidden')
        statusElem.innerHTML = ''
    }, 5000);
}