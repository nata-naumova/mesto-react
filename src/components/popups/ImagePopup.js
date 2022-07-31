import React from 'react';

function ImagePopup(props) {
    return (
        <div id="popup_img" className={`popup popup_overlay ${props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_img">
                <button
                    type="button"
                    className="btn popup__close popup-close-img"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                ></button>
                <img src={props.card.link} alt={props.card.name} className="popup__img" />
                <h2 className="popup__img-title">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;