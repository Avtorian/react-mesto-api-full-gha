import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked && 'elements__like-button_active'}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="elements__item">
      <img
        onClick={handleCardClick}
        src={props.card !== null ? props.card.link : "#"}
        alt={props.card !== null ? props.card.name : "#"}
        className="elements__item-photo"
      />
      <div className="elements__container">
        <h2 className="elements__item-title">{props.card.name}</h2>
        <div className="elements__like-container">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <p className="elements__like-value">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button onClick={handleDeleteClick} type="button" className="elements__item-delete"></button>}
    </li>
  )
}
