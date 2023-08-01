export default function ImagePopup(props) {
  return (
    <div className={`popup imagePopup + ${props.card && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__photo" src={props.card !== null ? props.card.link : "#"} alt="Фото" />
        <p className="popup__text">{props.card !== null ? props.card.name : "#"}</p>
        <button onClick={props.onClose} type="button" className="popup__close" />
      </div>
    </div>
  )
}
