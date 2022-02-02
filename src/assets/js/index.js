import { newPalette, userAPI } from './api';
import '../styles/stylesheet.scss';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const loadData = async () => {
  const main = document.getElementsByTagName('main')[0];
  for (let i = 0; i < 6; i++) {      
    const paletteCard = document.createElement('div');
    paletteCard.classList.add('palette-card');  
    const paletteContent = document.createElement('div');
    paletteContent.classList.add('palette-content');
    const response = await newPalette();
    const colors = await response.result;
    // identifier = colors.flat(1).join('')
    colors.forEach(element => {
      const color = document.createElement('div');
      color.classList.add('colors');
      color.style.cssText = `background-color: rgb(${element.join(',')})`;
      paletteContent.appendChild(color);
    });
    paletteCard.appendChild(paletteContent);
    main.appendChild(paletteCard);
    const paletteTitle = document.createElement('div');
    paletteTitle.id = 'palette-title';
    const paletteName = document.createElement('h2');    
    paletteName.innerText = `Palette ${i + 1}`;
    const likes = document.createElement('p');
    likes.innerText = ': 0';
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('fas', 'fa-heart');
    likes.prepend(likesIcon);
    paletteTitle.appendChild(paletteName);  
    paletteTitle.appendChild(likes);
    paletteCard.appendChild(paletteTitle);

    // main.innerHTML = `<p>${colors.flat(1).join('')}</p>`;
  }
};

loadData();