const REMOVE_ALERT_TIMEOUT = 5000;

const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_ALERT_TIMEOUT);
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }
}

function onOutsideClick(evt) {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (evt.target === messageElement) {
    hideMessage();
  }
}

const onCloseButtonClick = () => {
  hideMessage();
};

const showMessage = (templateId, buttonClass) => {
  const template = document.querySelector(templateId).content.querySelector('section');
  const messageElement = template.cloneNode(true);

  document.body.append(messageElement);

  const closeButton = messageElement.querySelector(buttonClass);
  closeButton.addEventListener('click', onCloseButtonClick);

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showDataError, showSuccessMessage, showErrorMessage, debounce };
