import { MESSAGES, NAMES } from './data.js';
import { getRandomNumber } from './utils.js';

const PHOTOS_COUNT = 25;
let commentIdCounter = 1;

const createComment = () => {
  const messageCount = getRandomNumber(1, 2);
  const comments = Array.from({length: messageCount}, () => MESSAGES[getRandomNumber(0, MESSAGES.length - 1)]);

  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: comments.join(' '),
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };
};

const createPhotoDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: `Описание фотографии номер ${id}`,
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, createComment)
});

const photoDescriptions = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhotoDescription(index + 1));

export { photoDescriptions };
