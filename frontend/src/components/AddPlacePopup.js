import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() =>{
    setTitle('');
    setLink('');
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      mestoLink: link,
      mestoTitle: title
    })
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm
      name="cardPopup"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="mestoTitle-input"
        name="mestoTitle"
        type="text"
        placeholder="Название"
        className="popup__input-text popup__input-text_type_title"
        minLength={2}
        maxLength={30}
        required
        onChange={handleChangeTitle}
        value={title}
      />
      <span className="popup__input-error mestoTitle-input-error">
        Вы пропустили это поле.
      </span>
      <input
        id="mestoLink-input"
        name="mestoLink"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_link"
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span className="popup__input-error mestoLink-input-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  )
}
