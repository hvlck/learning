// Injects scripts into page
let data;

// Begins fetchData function at load
window.addEventListener('load', fetchData());

// Fetches data in storage and controls the removal and addition of new styles
function fetchData() {
    browser.storage.local.get([
        'options',
        'style'
    ]).then(function(response) {
        data = {
            "style": response.style,
            "options": response.options
        }
    }).then(function() {
        removeStyles();
    }).then(function() {
        addNewStyle();
    }).catch(function(err) {
        console.error(err);
        logError(err);
    });
};

let links = document.querySelectorAll('link[href$=".css"]'); // All link elements that have an href value that ends with .css
let styles = document.querySelectorAll('style');

// Removes all link and style elements if user options specify to do so
function removeStyles() {
    links.forEach(element => {
        if (data.options && data.options.alwaysOn) {
            element.parentElement.removeChild(element);
        } else { return }
    });

    styles.forEach(element => {
        if (data.options.alwaysOn) {
            element.parentElement.removeChild(element);
        } else { return }
    });
}

// Adds new style if options specify to do so or there are no link or style elements
function addNewStyle() {
    if (data.options.alwaysOn || styles.length == 0 && links.length == 0) {
        let newStyle = document.createElement('style');
        newStyle.textContent = data.style;
        document.head.appendChild(newStyle);
    }
}

// Logs errors to the console
function logError(message) {
    console.error(`Override Default Styles Error: ${message}`)
};