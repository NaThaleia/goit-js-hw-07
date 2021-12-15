import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryCards(galleryItems);

galleryContainer.innerHTML = cardsMarkup;

// settings
const lightboxSettings = {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
};

function createGalleryCards(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>`;
    })
    .join("");
}

const createGallery = new SimpleLightbox(".gallery a", lightboxSettings);
