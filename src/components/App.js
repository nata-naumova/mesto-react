import React from 'react';
import '../index.css';
import logo from '../logo.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import api from '../utils/api';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Footer } from './Footer.js';
import ImagePopup from "./popups/ImagePopup";

function App() {
  /* ---------- Переменные состояния ----------- */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  /* ---------- Эффект при монтировании ----------- */
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  /* ---------- Кнопка лайка ----------- */
  function handleCardLikeClick(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.deleteLike(card, isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch(() => { console.log('Что-то пошло не так') })
    }
    else {
      api.setLike(card, !isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch(() => { console.log('Что-то пошло не так') })
    }
  }

  /* ---------- Кнопка корзины (удаление карточки) ----------- */
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  /* ---------- Обновление данных пользователя ----------- */
  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так :(')
    })
  }

  /* ---------- Обновление аватара ----------- */
  function handleUpdateAvatar(newData) {
    api.editAvatar(newData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так')
    })
  }

  /* ---------- Закрытие всех модальных окон ----------- */
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  /* ---------- Сохранение данных ----------- */
  function handleAddPlaceSubmit(card) {
    api.addCard(card).then((newCard) => {
      // Обновляем стейт cards с поммощью расширенной копии текущего массива
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так');
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header src={logo} />
        <CurrentCardContext.Provider value={cards}>
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLikeClick}
            onCardDelete={handleCardDelete}
          />
        </CurrentCardContext.Provider>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
