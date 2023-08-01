import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirmation from "./PopupWithСonfirmation";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/Api.js';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js"
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth.js';
import pathUnionSuc from '../images/UnionSuc.svg';
import pathUnionErr from '../images/UnionErr.svg';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [infoTooltip, setInfoTooltip] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [report, setReport] = React.useState({ pathImg: "", title: "", });

  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getProfileInfo()])
        .then(([initialCards, userData]) => {
          // ["Первый промис", "Второй промис"]
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn]);

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          navigate("/", { replace: true })
        }
      })
        .catch((err) => console.log(`Ошибка ${err}`));
    };
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => console.log(`Ошибка ${err}`));;
  }
  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
      .catch((err) => console.log(`Ошибка ${err}`));;
  }
  function handleUpdateUser(UserInfo) {
    api.editProfile(UserInfo)
      .then(newInfo => {
        setCurrentUser(newInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));

  }
  function handleUpdateAvatar(link) {
    api.editProfileAvatar(link)
      .then(newAvatar => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));

  }
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));

  }

  function onSignOut() {
    setEmail("");
    setLoggedIn(false);
    navigate('/sign-in');
    localStorage.removeItem('jwt');
  }

  function onRegister({ password, email }) {
    auth.register({ password, email })
      .then((res) => {
        setInfoTooltip(true);
        navigate("sign-in", { replace: true })
        setReport({
          pathImg: pathUnionSuc,
          title: "Вы успешно зарегистрировались!"
        });
      })
      .catch((err) => {
        setInfoTooltip(true);
        console.log(err)
        setReport({
          pathImg: pathUnionErr,
          title: "Что-то пошло не так! Попробуйте ещё раз."
        })
      })
  }
  function onLogin({ password, email }) {
    auth.authorize({ password, email })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true);
        setReport({
          pathImg: pathUnionErr,
          title: "Что-то пошло не так! Попробуйте ещё раз."
        })
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route path="/" element={
              <>
                <Header email={email} onClick={onSignOut} buttonName="Выйти" />
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </>
            }
            />
            <Route path="/sign-up" element={<Register onRegister={onRegister} />} />
            <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
            <Route path="*" element={loggedIn  ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
          </Routes>
          {loggedIn && <Footer />}

          <EditAvatarPopup
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />

          <PopupWithConfirmation />
          <InfoTooltip
            report={report}
            onClose={closeAllPopups}
            isOpen={infoTooltip}
          />

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
