import {newPalette, userAPI} from "./api";

console.log("Hello World!");

const loadData = async () => {
  const newPal = await newPalette();
  console.log(newPal);
  document.getElementById("esparta").innerHTML = newPal.result; 
  
};

loadData();


