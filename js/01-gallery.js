import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryList = document.querySelector('.gallery');

const makeImageMarkup = ({ original, preview, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
      loading="lazy"
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
};

galleryList.onclick = (e) => {
    
    const originalImg = e.target.dataset.source;
    const alt = e.target.alt;
    const markUp = `
        <img width="1400" height="900" src="${originalImg}" alt="${alt}">
    `;

    const instance = basicLightbox.create(markUp,
        {
            onShow: () => {
                galleryList.addEventListener(`keydown`, onEscapePress), document.body.classList.add('no-scroll')
            },
            onClose: () => {
                galleryList.removeEventListener(`keydown`, onEscapePress), document.body.classList.remove('no-scroll')
            },
        });

    instance.show()
    
    function onEscapePress(e) {
        if (e.code === "Escape") {
            instance.close()
        }
    }
};

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(image => {
        image.src = image.dataset.src;
    });
} else {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossorigin = "anonymous";
    script.referrerpolicy = "no-referrer";
    document.body.appendChild(script);
}