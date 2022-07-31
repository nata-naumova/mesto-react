import React from 'react';
import api from '../utils/api';
import Card from './Card'

export function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, getUserName] = React.useState("");
    const [userDescription, getUserDescription] = React.useState("");
    const [userAvatar, getUserAvatar] = React.useState("");

    const [cards, getCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([initialCards, userData]) => {
                getUserName(userData.name);
                getUserDescription(userData.about);
                getUserAvatar(userData.avatar);

                getCards(initialCards);
            })
            .catch(() => {
                console.log('Что-то пошло не так :(')
            })
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <img
                    src={userAvatar}
                    alt="Аватар пользователя"
                    className="profile__avatar"
                />
                <button
                    className="profile__avatar-btn"
                    onClick={onEditAvatar}
                ></button>

                <div className="profile__info">
                    <div className="profile__top">
                        <h1 className="profile__title">{userName}</h1>
                        <button
                            type="button"
                            className="profile__edit-btn btn popup-edit-profile"
                            aria-label="Редактировать профиль"
                            data-dismiss="popup_1"
                            onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-btn btn popup-add-card"
                    aria-label="Добавить запись"
                    data-dismiss="popup_2"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {
                    cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                likes={card.likes}
                                name={card.name}
                                link={card.link}
                                onCardClick={onCardClick}
                            />
                        )
                    })
                }
            </section>
        </main>
    )
}