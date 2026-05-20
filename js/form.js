import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showDataError } from './utils.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput || document.activeElement === commentInput;

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  const isErrorMessageOpen = Boolean(document.querySelector('.error'));
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageOpen) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  const file = uploadInput.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    previewImage.src = fileUrl;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    resetScale();
    resetEffects();
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    uploadInput.value = '';
    showDataError();
  }
};

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtagsCount = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }
  return parseHashtags(value).length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsUnique = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }
  const tags = parseHashtags(value);
  return tags.length === new Set(tags).size;
};

const validateHashtagsFormat = (value) => {
  if (!value || value.trim() === '') {
    return true;
  }
  return parseHashtags(value).every((tag) => HASHTAG_REGEX.test(tag));
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtagsFormat,
  'Хэштег должен начинаться с #, содержать только буквы/цифры и быть не длиннее 20 символов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
);

uploadInput.addEventListener('change', openUploadForm);
cancelButton.addEventListener('click', closeUploadForm);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
});
