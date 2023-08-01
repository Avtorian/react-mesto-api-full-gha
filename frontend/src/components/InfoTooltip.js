export default function InfoTooltip(props){
  return(
    <>
    <div className={`popup ${props.isOpen && "popup_opened"}`} >
        <div className="popup__container">
          <img className="popup__image" src={props.report.pathImg} alt={props.report.title}/>
          <h3 className="popup__title-notice">{props.report.title}</h3>
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close" />
        </div>
      </div>
    </>
  )
}
