import fetch from "node-fetch";

const newPalette = async () => {
  const response = await fetch('http://colormind.io/api/', {method:'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify({model : "default"})})
  const data = await response.json();
  return data;
}

export default newPalette;
