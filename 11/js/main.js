import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showDataError } from './utils.js';
import './form.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch(() => {
    showDataError();
  });
