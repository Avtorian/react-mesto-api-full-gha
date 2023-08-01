import Header from "./Header"
import React from "react";
import { useNavigate, Link } from 'react-router-dom';
export default function Register(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function handleClickEnter(){
    navigate('/sign-in', { replace: true });
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e){
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({
      password,
      email,
    });
  }
  return (
    <>
    <Header onClick={handleClickEnter} buttonName="Войти" />
    <div className="register">
      <form name="register" className="register__form" noValidate="" onSubmit={handleSubmit}>
      <h1 className="register__title">Регистрация</h1>
      <input
        id="registerMail-input"
        name="registerMail"
        type="email"
        placeholder="Email"
        className="register__input-text register__input-text_type_email"
        required
        onChange={handleChangeEmail}
        minLength="5"
        maxLength="40"
      />
      <input
        id="registerPass-input"
        name="registerPass"
        type="password"
        placeholder="Пароль"
        className="register__input-text register__input-text_type_pass"
        required
        onChange={handleChangePassword}
        minLength="5"
        maxLength="40"
      />
      <button
        type="submit"
        className="register__submit-btn"
      >
        Зарегистрироваться
      </button>
    </form>
    <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__entry">Войти</Link></p>
    </div>
    </>
  )
}
