import domFunctions from './frontend/domFunctions';
import '../styles/stylesheet.scss';

/* eslint-disable */
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
/* eslint-enable */

document.getElementById('gen-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML = '';
  const items = document.getElementById('gen-value').value;
  domFunctions.loadData(items);
  createDOM(items);
});

domFunctions.loadData(6);
domFunctions.createDOM(6);
