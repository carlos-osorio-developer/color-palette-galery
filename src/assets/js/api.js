import 'regenerator-runtime/runtime';
import fetch from "node-fetch";

const newPalette = async () => {
  const response = await fetch('http://colormind.io/api/', {method:'POST',body: JSON.stringify({model : "default"})});
  const data = await response.json();
  return data;
}

const newApp = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps', {method:'POST', headers: {'Content-Type': 'application/json'}});
  const data = await response.json();
  return data;
}

export { newPalette, newApp };
