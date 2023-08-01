import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = React.useRef();
  React.useEffect(() =>{
    inputRef.current.value = "";
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatarLink: inputRef.current.value
    });
  }
  return (
    <PopupWithForm
      name="avatarPopup"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarLink-input"
        name="avatarLink"
        type="url"
        placeholder="Ссылка на фото"
        className="popup__input-text popup__input-text_type_link"
        required
        ref={inputRef}
      />
      <span className="popup__input-error avatarLink-input-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  )
}
