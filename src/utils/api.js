class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        /* ---------- Eсли ошибка, отклоняем промис ----------- */
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    /* ---------- Загрузка информации о пользователе с сервера ----------- */
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Загрузка карточек с сервера ----------- */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Редактирование профиля ----------- */
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Добавление новой карточки ----------- */
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Удаление карточки ----------- */
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Постановка и снятие лайка ----------- */
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    /* ---------- Обновление аватара пользователя ----------- */
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._parseResponse(res));
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '3e8431a3-54b0-494c-b0b7-18b456b2213e',
        'Content-Type': 'application/json'
    }
});

export default api;