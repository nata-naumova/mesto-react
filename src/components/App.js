import React from 'react';
import '../index.css';
import logo from '../logo.svg';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';

import PopupWithForm from './popups/PopupWithForm.js';
import ImagePopup from "./popups/ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header src={logo} />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label htmlFor="input-title" className="popup__field">
              <input
                type="text"
                id="input-title"
                className="popup__input"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="popup__input-error" id="input-title-error"></span>
            </label>
            <label htmlFor="input-job" className="popup__field">
              <input
                type="text"
                id="input-job"
                className="popup__input"
                name="about"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="popup__input-error" id="input-job-error"></span>
            </label>
          </>
        }
      />

      <PopupWithForm
        name="add-card"
        title="Новое место"
        button="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label htmlFor="input-name" className="popup__field">
              <input
                type="text"
                id="input-name"
                className="popup__input"
                name="name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="popup__input-error" id="input-name-error"></span>
            </label>
            <label htmlFor="input-link" className="popup__field">
              <input
                type="url"
                id="input-link"
                className="popup__input"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__input-error" id="input-link-error"></span>
            </label>
          </>
        }
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        button="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label htmlFor="input-avatar" className="popup__field">
              <input
                type="url"
                id="input-avatar"
                name="avatar"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__input-error" id="input-avatar-error"></span>
            </label>
          </>
        }
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
