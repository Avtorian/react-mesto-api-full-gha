import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      avatarName: name,
      avatarJob: description,
    });
  }

  return (
    <PopupWithForm
      name="profilePopup"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarName-input"
        name="avatarName"
        type="text"
        placeholder="Имя"
        className="popup__input-text popup__input-text_type_name"
        minLength={2}
        maxLength={40}
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error avatarName-input-error">
        Вы пропустили это поле.
      </span>
      <input
        id="avatarJob-input"
        name="avatarJob"
        type="text"
        placeholder="Работа"
        className="popup__input-text popup__input-text_type_job"
        minLength={2}
        maxLength={200}
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error avatarJob-input-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  )
}
