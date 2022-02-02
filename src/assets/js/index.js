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
    const paletteHeader = document.createElement('div');
    paletteHeader.classList.add('palette-header');
    const paletteColors = document.createElement('div');
    paletteColors.classList.add('palette-colors');

    const response = await newPalette();
    const colors = await response.result;
    // identifier = colors.flat(1).join('')
    colors.forEach(element => {
      const color = document.createElement('div');
      color.classList.add('colors');
      color.style.cssText = `background-color: rgb(${element.join(',')})`;
      paletteColors.appendChild(color);
    });
    paletteHeader.appendChild(paletteColors);
    paletteCard.appendChild(paletteHeader);
    main.appendChild(paletteCard);

    const paletteTitle = document.createElement('div');
    paletteTitle.id = 'palette-title';
    const paletteName = document.createElement('h2');    
    paletteName.innerText = `Palette ${i + 1}`;
    const likes = document.createElement('p');
    likes.id = 'palette-likes';
    likes.innerText = '0';
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('fas', 'fa-heart');
    likes.prepend(likesIcon);
    paletteTitle.appendChild(paletteName);  
    paletteTitle.appendChild(likes);
    paletteHeader.appendChild(paletteTitle);
        
    const commentsButton = document.createElement('span');
    commentsButton.id = 'comments-button';
    commentsButton.innerText = 'Comments';
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fas', 'fa-comment');
    commentsButton.prepend(commentIcon);    
    paletteCard.appendChild(commentsButton);

    // main.innerHTML = `<p>${colors.flat(1).join('')}</p>`;
  }
};

loadData();