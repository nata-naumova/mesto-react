import React from 'react';
import api from '../utils/api';
import Card from './Card'

export function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([initialCards, userData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);

                setCards(initialCards);
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