import { galleryItems } from "./gallery-items.js";
//console.log(galleryItems);
// первый вариант с вызовом слушателей

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryCards(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", targetGalleryCard);

let modal = {};
let onCloseEscape; // переменная для вызова / слушателя клика

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
  onCloseEscape = document.querySelector(".basicLightbox"); // создаем связь с дом с открытым модальным окном
  onCloseEscape.addEventListener("click", CloseEscape); // вешаем слушатель на клик по модальному окну (по умолчанию это весь документ)
}

function onClickEscapeGalleryModal(e) {
  if (e.code !== "Escape") {
    console.log(e);
    return;
  }
  console.log("клац клац");
  modal.close();
  document.removeEventListener("keyup", onClickEscapeGalleryModal);
  onCloseEscape.removeEventListener("click", CloseEscape); // добавлям снятие слушателя по клику если мы сняли эксейпом
}

function CloseEscape() {
  // делаем отдельную функцию для закрытия клавишей в которой дополнитально снимаем всех слушателей
  console.log("клик клик");
  document.removeEventListener("keyup", onClickEscapeGalleryModal); // снимаем слушателя клавиш если сняли мышкой
  onCloseEscape.removeEventListener("click", CloseEscape); // снимаем слушателя по клику собственно когда мы закрыли все
}

/* вариант 2 красивый */ // это вариант с использоваем настроек самой библиотеки, вы можем передать в неё объект с необходимыми нам параметрами, например на открытие передать выполнение запуска слушателя, а на закрыте снятие слушателя
/*
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
  return basicLightbox.create(`<img src="${img}" width="800" height="600">`, {
    onShow: () => {
      console.log("Включение слушателя по клавишам");
      document.addEventListener("keyup", onClickEscapeGalleryModal);
    },
    onClose: () => {
      console.log("Выключение слушателя по клавишам");
      document.removeEventListener("keyup", onClickEscapeGalleryModal);
    },
  });
}

function openGalleryModalWindow(img) {
  modal = createGalleryModalImg(img);
  modal.show();
}

function onClickEscapeGalleryModal(e) {
  if (e.code !== "Escape") {
    console.log(e);
    return;
  }
  console.log("клац клац");
  modal.close();
}*/
