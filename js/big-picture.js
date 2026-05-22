const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = 35;
  commentImg.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;

  commentItem.append(commentImg);
  commentItem.append(commentText);

  return commentItem;
};

const renderComments = () => {
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_STEP);
  commentsShown += nextComments.length;

  const fragment = document.createDocumentFragment();
  nextComments.forEach((commentData) => {
    fragment.append(createComment(commentData));
  });

  commentsContainer.append(fragment);

  commentsShownCount.textContent = commentsShown;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => renderComments();

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsShown = 0;
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  comments = photo.comments;
  commentsTotalCount.textContent = comments.length;
  commentsContainer.innerHTML = '';
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown, { once: true });
};

closeButton.addEventListener('click', onCloseButtonClick);

export { openBigPicture };
