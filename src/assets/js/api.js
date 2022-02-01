import 'regenerator-runtime/runtime';
import fetch from "node-fetch";

const userAPIkey = 'glxHDULSQ1BHVNRpRALx';

const newPalette = async () => {
  const response = await fetch('http://colormind.io/api/', {method:'POST',body: JSON.stringify({model : "default"})});
  const data = await response.json();
  return data;
}

const newApp = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps', { method: 'POST' });
  const appId = await response.text(); //had to use .text() instead of .json() because of the way the API is set up
  if (!localStorage.getItem('appId')) localStorage.setItem('appId', appId);
};

export { newPalette, newApp };
