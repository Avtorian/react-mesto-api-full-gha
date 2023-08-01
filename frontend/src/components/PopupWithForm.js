export default function PopupWithForm(props) {

  return (
    <>
      <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`} >
        <div className="popup__container">
          <h3 className="popup__title">{props.title}</h3>
          <form name={props.name} className="popup__input" noValidate="" onSubmit={props.onSubmit}>
            {props.children}
            <button
              type="submit"
              className="popup__submit-btn"
            >
              {props.textButton}
            </button>
          </form>
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close" />
        </div>
      </div>
    </>
  )
}
