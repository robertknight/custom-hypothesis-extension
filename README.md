# Custom Hypothesis

A browser extension for Chrome that adds [Hypothesis](https://hypothes.is) to a
web page with custom configuration.

The client configuration can be specified in the extension's options. Because
forms are for wimps, the options page expects configuration in JSON format. See
[the client's
documentation](https://h.readthedocs.io/projects/client/en/latest/publishers/config/)
for information on the supported configuration.

## Usage

1. Clone this repository
2. Go to [chrome://extensions](chrome://extensions) and check the "Developer mode" checkbox
3. Click "Load unpacked extension" and select the checked out code. This will
   add a "Custom Hypothesis" extension to Chrome with an orange "h" toolbar
   icon.
4. Click the "Options" link for the extension to edit the config. For example,
   to change the client's background color:

   ```json
   {
     "branding": {
       "appBackgroundColor": "rebeccapurple"
     }
   }
   ```
5. To activate Hypothesis on a page with custom config, click the orange "h" icon in
   the browser's toolbar.

## Known issues

* The client will fail to load on pages that have strict Content Security Policy
  (eg. GitHub). This is because the client is not bundled into this extension,
  unlike the official Hypothesis client.

* If a tab already has the client active and you want to add the Hypothesis
  client with a different configuration, you will need to reload the page and
  click the toolbar icon again to add the client with the latest configuration.
