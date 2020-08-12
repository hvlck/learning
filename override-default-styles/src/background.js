// Opens options page when extension is installed
browser.runtime.onInstalled.addListener(function() {
    browser.runtime.openOptionsPage().catch(() => { return })
});
