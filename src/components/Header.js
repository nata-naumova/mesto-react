import React from 'react';

export function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={props.src} alt="Логотип сайта" />
        </header>
    )
}