import Header from "./Header"
import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function handleClickRegister() {
    navigate('/sign-up', { replace: true });
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e){
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({password, email});
  }
  return (
    <>
      <Header onClick={handleClickRegister} buttonName="Регистрация" />
      <div className="login">
        <form name="login" className="login__form" noValidate="" onSubmit={handleSubmit}>
          <h1 className="login__title">Вход</h1>
          <input
            id="loginMail-input"
            name="loginMail"
            type="email"
            placeholder="Email"
            className="login__input-text login__input-text_type_email"
            required
            onChange={handleChangeEmail}
          />
          <input
            id="loginPass-input"
            name="loginPass"
            type="password"
            placeholder="Пароль"
            className="login__input-text login__input-text_type_pass"
            required
            onChange={handleChangePassword}
          />
          <button
            type="submit"
            className="login__submit-btn"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  )
}
