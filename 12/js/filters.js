import { renderThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let originPhotos = [];

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const filterRules = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => photos.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT),
  'filter-discussed': (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
};

const renderDebounced = debounce((filterId) => {
  clearThumbnails();
  const filteredPhotos = filterRules[filterId](originPhotos);
  renderThumbnails(filteredPhotos);
}, DEBOUNCE_DELAY);

const onFiltersFormClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const activeClass = 'img-filters__button--active';
  filtersForm.querySelector(`.${activeClass}`).classList.remove(activeClass);
  evt.target.classList.add(activeClass);
  renderDebounced(evt.target.id);
};

const initFilters = (photos) => {
  originPhotos = photos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersFormClick);
};

export { initFilters };
