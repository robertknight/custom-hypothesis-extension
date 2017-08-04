'use strict';

function addClientToPage() {
  let configStr;

  try {
    const config = JSON.parse(localStorage.getItem('config') || '{}');

    // Remove whitespace
    configStr = JSON.stringify(config);
  } catch (e) {
    window.alert('Saved client configuration is not valid');
  }

  const script = `
    // Remove any existing config scripts
    const existingConfigScripts = Array.from(document.querySelectorAll('.js-hypothesis-config'));
    existingConfigScripts.forEach(el => el.remove());

    // Unload any existing client
    const annotatorLink =
      document.querySelector('link[type="application/annotator+html"]');
    if (annotatorLink) {
      const destroyEvent = new Event('destroy');
      annotatorLink.dispatchEvent(destroyEvent);
    }

    // Add new config script
    const configScript = document.createElement('script');
    configScript.className = 'js-hypothesis-config';
    // configStr must be embedded in a single-quoted string to escape quotes in
    // the JSON data.
    configScript.textContent = '${configStr}';
    configScript.type = 'application/json';
    document.head.appendChild(configScript);

    // Add client to page
    const embedScript = document.createElement('script');
    embedScript.src = 'https://hypothes.is/embed.js';
    document.body.appendChild(embedScript);
  `;

  chrome.tabs.executeScript({
    code: script,
    runAt: 'document_end',
  });
}

const defaultConfig = { openSidebar: true };

if (!localStorage.getItem('config')) {
  localStorage.setItem('config', JSON.stringify(defaultConfig));
}

chrome.browserAction.onClicked.addListener(addClientToPage);
