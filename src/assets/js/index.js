import { newPalette, userAPI } from './api';
import '../styles/stylesheet.scss';

/* eslint-disable */
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
/* eslint-enable */

const rgbToHex = function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

const loadData = async (n) => {
  const likesArray = await userAPI.getLikes();

  for (let i = 0; i < n; i += 1) {
    /* eslint-disable no-await-in-loop */
    const response = await newPalette();
    const colors = await response.result;
    /* eslint-enable no-await-in-loop */

    const paletteCard = document.getElementsByClassName('palette-card')[i];
    paletteCard.id = `id-${colors.flat(1).join('_')}`;
    const paletteColors = document.getElementsByClassName('palette-colors')[i];
    colors.forEach((element) => {
      const color = document.createElement('div');
      color.id = `id-${element.join('_')}`;
      color.classList.add('colors');
      color.style.cssText = `background-color: rgb(${element.join(',')})`;
      paletteColors.appendChild(color);
    });

    const likes = document.getElementsByClassName('palette-likes')[i];
    const likeSpan = document.createElement('span');
    likesArray.forEach((element) => {
      const likesText = element.item_id === paletteCard.id ? `${element.likes}` : '0';
      likeSpan.innerText = likesText;
      likes.append(likeSpan);
    });
  }
};

const updateLikes = async function updateLikes(id) {
  const likes = document.getElementById(id).firstChild.lastChild.lastChild.lastChild;
  const likesText = likes.innerText;
  const likesNumber = parseInt(likesText, 10);
  const newLikes = likesNumber + 1;
  likes.innerText = `${newLikes}`;
};

const addComment = function addComment(name, text, date) {
  const comSection = document.getElementById('comments');
  const comment = document.createElement('div');
  comment.classList.add('comment');
  const commentText = document.createElement('p');
  commentText.innerText = text;
  const commentAuthor = document.createElement('span');
  commentAuthor.innerText = `${name}: `;
  const commentDate = document.createElement('span');
  commentDate.innerText = date;
  comment.appendChild(commentAuthor);
  comment.appendChild(commentText);
  comment.appendChild(commentDate);
  comSection.appendChild(comment);
};

const getComments = async function getComments(id) {
  const comments = await userAPI.getComments(id);
  const comSection = document.getElementById('comments');
  const NoComm = document.createElement('p');
  // const header = comSection.parentElement.parentElement.children[2];
  NoComm.id = 'no-comments';
  const counter = document.getElementById('comment-counter');
  const number = comments.error ? 0 : comments.length;
  counter.innerText = `${number} comments`;
  // header.appendChild(counter);

  if (comments.error) {
    NoComm.innerText = 'No comments yet';
    comSection.appendChild(NoComm);
  } else {
    comSection.innerHTML = '';
    comments.forEach((element) => {
      addComment(element.username, element.comment, element.creation_date);
    });
  }
};

const commentsModal = function commentsModal(element) {
  const commentsModal = document.createElement('div');
  commentsModal.id = 'comments-modal';
  const title = document.createElement('h2');
  title.innerText = 'Comment on this palette';
  const closeIcon = document.createElement('div');
  closeIcon.id = 'modal-close-icon';

  closeIcon.addEventListener('click', function closeIcon() {
    const removeDiv = this.parentElement;
    removeDiv.parentElement.removeChild(removeDiv);
  });
  const xIcon = document.createElement('i');
  xIcon.classList.add('fas', 'fa-times');
  closeIcon.appendChild(xIcon);

  const paletteHeader = element.parentElement.children[0].cloneNode(true);
  const likeBtn = paletteHeader.lastChild.lastChild.firstChild;
  const spanBtn = paletteHeader.lastChild.lastChild.lastChild;

  for (let i = 0; i < 5; i += 1) {
    const rgbCode = paletteHeader.children[0].children[i].id.split('_');
    const hexCode = rgbToHex(rgbCode[1]) + rgbToHex(rgbCode[2]) + rgbToHex(rgbCode[3]);
    const code = document.createElement('p');
    code.innerText = `#${hexCode}`;
    paletteHeader.children[0].children[i].appendChild(code);
  }

  commentsModal.appendChild(title);
  commentsModal.appendChild(closeIcon);
  commentsModal.appendChild(paletteHeader);
  document.body.children[2].appendChild(commentsModal);

  const commentCounter = document.createElement('p');
  commentCounter.id = 'comment-counter';
  const commentsSection = document.createElement('div');
  commentsSection.id = 'comments-section';
  getComments(element.parentElement.id);
  const comments = document.createElement('div');
  comments.id = 'comments';
  const commentForm = document.createElement('form');
  commentForm.id = 'comment-form';
  const nameInput = document.createElement('input');
  nameInput.id = 'name-input';
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';
  const commentInput = document.createElement('input');
  commentInput.id = 'comment-input';
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment';
  const commentButton = document.createElement('input');
  commentButton.id = 'comment-button';
  commentButton.type = 'submit';
  commentForm.appendChild(nameInput);
  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentButton);
  commentsSection.appendChild(comments);
  commentsSection.appendChild(commentForm);
  commentsModal.appendChild(commentsSection);

  let commentsNumber = document.getElementsByClassName('comment').length;
  commentCounter.innerText = `${commentsNumber} comments`;
  paletteHeader.appendChild(commentCounter);

  likeBtn.addEventListener('click', () => {
    userAPI.postLike(element.parentElement.id);
    updateLikes(element.parentElement.id);
    spanBtn.innerText = `${parseInt(spanBtn.innerText, 10) + 1}`;
  });

  commentButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (commentInput.value !== '' && nameInput.value !== '') {
      if (comments.firstChild.children.length === 0) {
        document.getElementById('no-comments').remove();
      }
      const name = nameInput.value;
      const comment = commentInput.value;
      userAPI.postComment(element.parentElement.id, name, comment);
      nameInput.value = '';
      commentInput.value = '';
      const date = new Date();
      commentsNumber += 1;
      commentCounter.innerText = `${commentsNumber} comments`;
      paletteHeader.appendChild(commentCounter);
      addComment(name, comment, date.toDateString());
    }
  });
};

const createDOM = function createDOM(n) {
  const main = document.getElementsByTagName('main')[0];
  for (let i = 0; i < n; i += 1) {
    const paletteCard = document.createElement('div');
    paletteCard.classList.add('palette-card');
    const paletteHeader = document.createElement('div');
    paletteHeader.classList.add('palette-header');
    const paletteColors = document.createElement('div');
    paletteColors.classList.add('palette-colors');

    paletteHeader.appendChild(paletteColors);
    paletteCard.appendChild(paletteHeader);
    main.appendChild(paletteCard);

    const paletteTitle = document.createElement('div');
    paletteTitle.id = 'palette-title';
    const paletteName = document.createElement('h2');
    paletteName.innerText = `Palette ${i + 1}`;
    const likes = document.createElement('p');
    likes.classList.add('palette-likes');
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('fas', 'fa-heart');
    likes.prepend(likesIcon);

    paletteTitle.appendChild(paletteName);
    paletteTitle.appendChild(likes);
    paletteHeader.appendChild(paletteTitle);
    likes.addEventListener('click', () => {
      userAPI.postLike(paletteCard.id);
      updateLikes(paletteCard.id);
    });

    const commentsButton = document.createElement('span');
    commentsButton.classList.add('comments-button');
    commentsButton.innerText = 'Comments';
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fas', 'fa-comment');
    commentsButton.prepend(commentIcon);
    paletteCard.appendChild(commentsButton);    
    commentsButton.addEventListener('click', function commBtn() {
      commentsModal(this);
    });
  }
};

document.getElementById('gen-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML = '';
  const items = document.getElementById('gen-value').value;
  loadData(items);
  createDOM(items);
});

loadData(6);
createDOM(6);
