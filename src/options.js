'use strict';

function setError(err) {
  parseStatus.style.fontWeight = 'bold';
  if (err) {
    parseStatusEl.textContent = err.message;
    parseStatusEl.style.color = '#c55';
  } else {
    parseStatusEl.textContent = 'OK';
    parseStatusEl.style.color = '#5c5';
  }
}

const configInputEl = document.querySelector('#config');
const parseStatusEl = document.querySelector('#parseStatus');

try {
  const config = JSON.parse(localStorage.getItem('config'));
  configInputEl.textContent = JSON.stringify(config, null, 2);
} catch (e) {
  configInputEl.textContent = '{}';
}

configInputEl.oninput = () => {
  const content = configInputEl.value;
  try {
    JSON.parse(content);
    localStorage.setItem('config', content);
    setError(null);
  } catch (e) {
    setError(e);
  }
};
