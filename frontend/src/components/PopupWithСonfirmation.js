import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation(props) {
  return (
    <PopupWithForm
      name="deletePopup"
      title="Вы уверены?"
      textButton="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
    ></PopupWithForm>
  )
}
