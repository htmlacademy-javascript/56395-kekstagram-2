const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const thumbnail = template.cloneNode(true);

    const photo = thumbnail.querySelector('.picture__img');
    photo.src = url;
    photo.alt = description;

    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
