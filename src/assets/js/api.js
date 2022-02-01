import 'regenerator-runtime/runtime';
import fetch from "node-fetch";

const userAPIurl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const userAPIkey = 'glxHDULSQ1BHVNRpRALx';

const newPalette = async () => {
  const response = await fetch('http://colormind.io/api/', {method:'POST',body: JSON.stringify({model : "default"})});
  const data = await response.json();
  return data;
}

const userAPI = {
  async newApp() {
    const response = await fetch(`${userAPIurl}`, { method: 'POST' });
    const appId = await response.text(); //had to use .text() instead of .json() because of the way the API is set up
    if (!localStorage.getItem('appId')) localStorage.setItem('appId', appId);
  },

  async postLike(itemId) {
    const response = await fetch(`${userAPIurl}/${userAPIkey}/likes`, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "item_id": itemId }),
    });
    const data = await response.text();
    return data;
  },

  async getLikes(itemId) {
    const response = await fetch(`${userAPIurl}/${userAPIkey}/likes`);
    const data = await response.json();
    return data;
  }
}

export { newPalette, userAPI };
