import React from 'react';

function Card({ card, link, name, likes, onCardClick }) {

    function handleCardClick() {
        onCardClick(card);
    }
    return (
        <article className="element">
            <div className="element__img-wrapper">
                <div className="element__img-bg popup-img" data-dismiss="popup_img" onClick={handleCardClick}></div>
                <img
                    src={link}
                    alt={name}
                    className="element__img"
                />
            </div>
            <button type="button" className="element__trash btn" aria-label="Удалить карточку"></button>
            <div className="element__group">
                <h2 className="element__title">{name}</h2>
                <div className="element__likes">
                    <button type="button" className="element__like-btn" aria-label="Поставить лайк"></button>
                    <span className="element__likes-number">{likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;