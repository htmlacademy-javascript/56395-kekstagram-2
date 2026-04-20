const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Елена',
  'Иван',
  'Ольга',
  'Алексей',
  'Наталья'
];

const PHOTOS_COUNT = 25;
let commentIdCounter = 1;

function getRandomNumber(a, b) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}

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

const photos = Array.from({length: PHOTOS_COUNT}, (_, index) => createPhotoDescription(index + 1));

/* eslint-disable no-console */
console.log(photos);
