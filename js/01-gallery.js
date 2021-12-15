import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryCards(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", targetGalleryCard);

let modal = {};

function createGalleryCards(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
  <a class="gallery__link"  href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function targetGalleryCard(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  openGalleryModalWindow(e.target.dataset.source);
}

function createGalleryModalImg(img) {
  return basicLightbox.create(`<img src="${img}" width="800" height="600">`);
}

function openGalleryModalWindow(img) {
  modal = createGalleryModalImg(img);
  modal.show();
  document.addEventListener("keyup", onClickEscapeGalleryModal);
}

function onClickEscapeGalleryModal(e) {
  if (e.code !== "Escape") {
    return;
  }
  modal.close();
  document.removeEventListener("keyup", onClickEscapeGalleryModal);
}
