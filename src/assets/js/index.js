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
    paletteCard.id = `id-${colors.flat(1).join('_')}`;    
    colors.forEach(element => {
      const color = document.createElement('div');
      color.id = `id-${element.join('-')}`;
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
    commentsButton.classList.add('comments-button');
    commentsButton.innerText = 'Comments';
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fas', 'fa-comment');
    commentsButton.prepend(commentIcon);    
    paletteCard.appendChild(commentsButton);  
    commentsButton.addEventListener('click', function() {
      commentsModal(this);
    }
    );  
  }
  
};

const commentsModal = function(element) {  
  const commentsModal = document.createElement('div');
  commentsModal.id = 'comments-modal';
  const title = document.createElement('h2');
  title.innerText = 'Comment on this palette';
  const closeIcon = document.createElement('i');
  closeIcon.classList.add('fas', 'fa-times');         

  const paletteHeader = element.parentElement.children[0].cloneNode(true);  
  for (let i = 0; i < 5; i++) {    
    const rgbCode = paletteHeader.children[0].children[i].id.split('-');
    const hexCode = rgbToHex(rgbCode[1]) + rgbToHex(rgbCode[2]) + rgbToHex(rgbCode[3]);
    const code = document.createElement('p');
    code.innerText = `#${hexCode}`;
    paletteHeader.children[0].children[i].appendChild(code);
  }

  commentsModal.appendChild(title);
  commentsModal.appendChild(closeIcon);
  commentsModal.appendChild(paletteHeader);
  document.body.children[1].appendChild(commentsModal);

  //add comments section
  const commentsSection = document.createElement('div');
  commentsSection.id = 'comments-section';
  const comments = document.createElement('div');
  comments.id = 'comments';
  const commentForm = document.createElement('form');
  commentForm.id = 'comment-form';
  const commentInput = document.createElement('input');
  commentInput.id = 'comment-input';
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment';
  const commentButton = document.createElement('input');
  commentButton.id = 'comment-button';
  commentButton.type = 'submit';  
  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentButton); 
  commentsSection.appendChild(comments);
  commentsSection.appendChild(commentForm);
  commentsModal.appendChild(commentsSection);

};

const rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

loadData();

