
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container-avatar">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
          <button onClick={props.onEditAvatar} type="button" className="profile__avatar-edit" />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__avatar-name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button" />
          </div>
          <p className="profile__avatar-job">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button" />
      </section>
      <section className="elements">
        <ul className="elements__items">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
