import logoPath from '../images/logo.svg';
export default function Header(props) {
  return (
    <header className="header">
      <img
        src={logoPath}
        alt="Логотип"
        className="header__logo"
      />
      <div className='header__container'>
      <p className='header__email'>{props.email}</p>
      <button onClick={props.onClick} className="header__button">{props.buttonName}</button>
      </div>
    </header>

  )
}
