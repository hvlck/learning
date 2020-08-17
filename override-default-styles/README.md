# override-default-styles

A simple FireFox WebExtension to override default browser styles.

I don't have any intention of submitting this to FireFox Addons.

## Roadmap

+ ~~CSS Preview Page~~

## Usage

Note: any changes will be applied after the page is reloaded.

Stylesheets can be changed and forced on all pages by navigating to the extension's options page.  All data can also be wiped on the options page.

## File Structure

```markdown
| src
	| background.js - background script, only opens the options page when installed
	| index.html - options page, UI for changing stylesheet and settings
	| manifest.json - WebExtension manifest, controls permissions, meta information for extension stores, content and background scripts
	| style.css - stylesheet for the options (src/index.html) page
	| styler.js - injects stylesheet into pages
	| update-options.js - sends user options from the options page (src/index.html) to extension storage
```

## Permissions

### Storage

ODS uses the [storage permission](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) to save the options that the user has provided through the built-in options page (`src/index.html`).
