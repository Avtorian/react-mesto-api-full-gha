export default class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._Url = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getProfileInfo() {
    return fetch(`${this._Url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkRes)
  }

  getInitialCards() {
    // ...
    return fetch(`${this._Url}/cards`, {
      headers: this._headers
    })
      .then(this._checkRes)
  }

  editProfile({ avatarName, avatarJob }) {
    return fetch(`${this._Url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: avatarName,
        about: avatarJob
      })
    })
      .then(this._checkRes)
  }
  editProfileAvatar({ avatarLink }) {
    return fetch(`${this._Url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then(this._checkRes);
  }
  addNewCard({ mestoLink, mestoTitle }) {
    return fetch(`${this._Url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: mestoLink,
        name: mestoTitle,
      })
    })
      .then(this._checkRes);
  }
  removeCard(cardId) {
    return fetch(`${this._Url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkRes);
  }
  addLike(cardId) {
    return fetch(`${this._Url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkRes);
  }
  removeLike(cardId) {
    return fetch(`${this._Url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkRes);
  }
  changeLikeCardStatus(cardId, isLiked){
    if(!isLiked){
      return this.removeLike(cardId);
    }else{
      return this.addLike(cardId);
    }
  }

}
