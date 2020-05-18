// Injects scripts into page

// Begins fetchData function at load
window.addEventListener('load', update());

let links = document.querySelectorAll('link[href$=".css"]'); // All link elements that have an href value that ends with .css
let styles = document.querySelectorAll('style');

// Fetches data in storage and controls the removal and addition of new styles
function update() {
    let data = {};
    browser.storage.local.get([
        'alwaysOn',
        'style'
    ]).then(function(response) {
        data = Object.assign(data, {
            "style": response.style || false,
            "alwaysOn": response.alwaysOn || false
        });
        console.log(data)
    }).then(() => {
        // Removes all link and style elements if user options specify to do so
        if (data.alwaysOn === true) {
            links.forEach(element => element.remove() )
            styles.forEach(element => { element.remove() })
        }
    }).then(() => {
        // Adds new style if options specify to do so or there are no link or style elements
        if (styles.length == 0 && links.length == 0) {
            if (data.alwaysOn === true) {
                let newStyle = document.createElement('style');
                newStyle.textContent = data.style;
                document.head.appendChild(newStyle);
            }
        }
    }).catch(function(err) {
        logError(err);
    });
};

// Logs errors to the console
function logError(message) {
    console.error(`Override Default Styles Error: ${message}`)
};