import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryList = document.querySelector('.gallery');
const modalEl = document.querySelector('.basicLightbox');

const makeImageMarkup = ({ original, preview, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
};

const makeImage = galleryItems.map(makeImageMarkup).join('');
galleryList.innerHTML = makeImage;

galleryList.addEventListener('click', onModalOpenClick);

function onModalOpenClick(e) {
    const imgTarget = e.target.classList.contains('gallery__image');
    if (!imgTarget) {
        return;
    }
    
    e.preventDefault();
    noScrollBody();
    createBasicLightbox(e);
};

function createBasicLightbox(e) {
    const originalImg = e.target.dataset.source;
    const instance = basicLightbox.create(`
		<img width="1400" height="900" src="${originalImg}">
	`);
    instance.show();
    window.addEventListener('keydown', omModalCloseClick);
};

function noScrollBody() {
    document.body.classList.toggle('no-scroll');
}

function omModalCloseClick(e) {
    if (e.code === 'Escape') {
        window.removeEventListener('keydown', omModalCloseClick);
        modal.classList.remove('basicLightbox');
    }
    
}