const EFFECTS = {
  none: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const DEFAULT_EFFECT = EFFECTS.none;
let chosenEffect = DEFAULT_EFFECT;

const imageForm = document.querySelector('.img-upload__form');
const previewImage = imageForm.querySelector('.img-upload__preview img');
const sliderContainer = imageForm.querySelector('.img-upload__effect-level');
const sliderElement = imageForm.querySelector('.effect-level__slider');
const effectLevelInput = imageForm.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const toggleSliderVisibility = () => {
  if (isDefault()) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const updateSliderOptions = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  toggleSliderVisibility();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS[evt.target.value];
  previewImage.className = `effects__preview--${evt.target.value}`;
  updateSliderOptions();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelInput.value = sliderValue;

  if (isDefault()) {
    previewImage.style.filter = 'none';
  } else {
    previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  previewImage.className = '';
  previewImage.style.filter = 'none';
  toggleSliderVisibility();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

toggleSliderVisibility();

imageForm.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
