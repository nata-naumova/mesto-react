import React from 'react';

function PopupWithForm(props) {
    return (
        <div id={`popup_${props.name}`} className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <h2 className="popup__title">{props.title}</h2>
                <form
                    action="#"
                    method="POST"
                    name={`${props.name}ProfileForm`}
                    className={`popup__form ${props.name}-profile`}
                    noValidate
                >
                    {props.children}
                    <button type="submit" className="popup__btn" onClick={props.closeAllPopups}>{props.button}</button>
                </form>
                <button
                    type="button"
                    className="btn popup__close popup-close-avatar"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    )
}
export default PopupWithForm;