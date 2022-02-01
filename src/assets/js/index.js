import {newPalette, newApp} from "./api";

console.log("Hello World!");

const loadData = async () => {
  const newPal = await newPalette();
  console.log(newPal);
  document.getElementById("esparta").innerHTML = newPal.result;
  const newApp = await newApp();
  document.body.appendChild(newApp.result);
};

loadData();


