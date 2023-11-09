import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import '../Main/Main.css';
import '../../vendor/displayNone.css';
import {
  SHOWN_MOVIES_QUANTITY_HIGH,
  SHOWN_MOVIES_QUANTITY_MID,
  SHOWN_MOVIES_QUANTITY_LOW,
  ADD_MOVIES_QUANTITY_HIGH,
  ADD_MOVIES_QUANTITY_LOW,
  DEVICE_WIDTH_HIGH,
  DEVICE_WIDTH_MID,
  DEVICE_WIDTH_LOW
} from '../../utils/Config';
import CurrentUserContext from '../../Contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../Auth/Auth';
import Header from '../Header/Header';
import MoviesPage from '../MoviesPage/MoviesPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundError from '../NotFoundError/NotFoundError';
import SavedMoviesPage from '../SavedMoviesPage/SavedMoviesPage';
import Notification from '../Notification/Notification';
import { useEffect, useState } from 'react';
import MainPage from '../MainPage/MainPage';

function App() {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);
  const [ signErrorMessage, setSignErrorMessage ] = useState('');
  const [ logButtonText, setLogButtonText ] = useState('Войти');
  const [ regButtonText, setRegButtonText ] = useState('Зарегистрироваться');
  const [ shownMoviesQuantity, setShownMoviesQuantity ] = useState(SHOWN_MOVIES_QUANTITY_HIGH);
  const [ addMoviesQuantity, setAddMoviesQuantity ] = useState(ADD_MOVIES_QUANTITY_HIGH);
  const [ pageDisplayNone, setPageDisplayNone ] = useState(true);
  const [ notification, setNotification ] = useState({ text: '', isGood: false, isActive: false });

  useEffect(() => {
    auth.validation()
    .then((userInfo) => {
      setIsLoggedIn(true);
      setCurrentUser(userInfo.data);
    })
    .catch(() => {
      setIsLoggedIn(false);
    })
    .finally(() => {
      setPageDisplayNone(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSignUp(userInfo) {
    auth.signUp(userInfo)
    .then(() => {
      onSignIn(userInfo);
    })
    .catch((err) => {
      if (err.status === 409) {
        setSignErrorMessage("Пользователь с таким email уже существует.");
        return;
      }

      if (err.status === 500) {
        setSignErrorMessage("На сервере произошла ошибка.")
      } else {
        setSignErrorMessage("При регистрации пользователя произошла ошибка.")
      }
    })
    .finally(() => {
      setRegButtonText('Зарегистрироваться');
    })
  };

  function onSignIn(userInfo) {
    auth.signIn(userInfo)
    .then((newUserInfo) => {
      navigate('/movies');
      setIsLoggedIn(true);
      setCurrentUser(newUserInfo.data);
      console.log(currentUser);
    })
    .catch((err) => {
      if (err.status === 401) {
        setSignErrorMessage("Вы ввели неправильный логин или пароль.");
        return;
      }

      if (err.status === 500) {
        setSignErrorMessage("На сервере произошла ошибка.")
      } else {
        setSignErrorMessage("При авторизации произошла ошибка. Токен не передан или передан не в том формате.")
      }
    })
    .finally(() => {
      setLogButtonText('Вход');
    })
  };

  function handleAddMovies() {
    setShownMoviesQuantity((state) => {
      state += addMoviesQuantity;
      return state;
    });
  }

  function handleResize() {
    setTimeout(() => {
      let deviceWidth = window.screen.width;

      if (deviceWidth >= DEVICE_WIDTH_HIGH) {
        setShownMoviesQuantity(SHOWN_MOVIES_QUANTITY_HIGH);
        setAddMoviesQuantity(ADD_MOVIES_QUANTITY_HIGH);
      }

      if (deviceWidth <= DEVICE_WIDTH_MID) {
        setShownMoviesQuantity(SHOWN_MOVIES_QUANTITY_MID);
        setAddMoviesQuantity(ADD_MOVIES_QUANTITY_LOW);
      }
  
      if (deviceWidth <= DEVICE_WIDTH_LOW) {
        setShownMoviesQuantity(SHOWN_MOVIES_QUANTITY_LOW);
      }
    }, 1000);
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className={ `page ${ pageDisplayNone ? "display-none" : ""}` }>
        <div className="page__content">
          <Header isLoggedIn={ isLoggedIn } />
          <Routes>
            <Route path='/' element={ <MainPage isLoggedIn={ isLoggedIn } /> } />
            <Route path='/signin' element={
              <main className="content">
                <Login
                  login={ true }
                  onSignIn={ onSignIn }
                  signErrorMessage={ signErrorMessage }
                  setSignErrorMessage={ setSignErrorMessage }
                  logButtonText={ logButtonText }
                  setLogButtonText={ setLogButtonText }
                  isLoggedIn={ isLoggedIn }
                />
              </main>
            } />
            <Route path='/signup' element={
              <main className="content">
                <Register
                  onSignUp={ onSignUp }
                  signErrorMessage={ signErrorMessage }
                  setSignErrorMessage={ setSignErrorMessage }
                  regButtonText={ regButtonText }
                  setRegButtonText={ setRegButtonText }
                  isLoggedIn={ isLoggedIn }
                />
              </main>
            } />
            <Route path='/movies' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <MoviesPage
                isLoggedIn={ isLoggedIn }
                setShownMoviesQuantity={ setShownMoviesQuantity }
                handleAddMovies={ handleAddMovies }
                shownMoviesQuantity={ shownMoviesQuantity }
                setAddMoviesQuantity={ setAddMoviesQuantity }
                handleResize={ handleResize }
                notification={ notification }
                setNotification={ setNotification }
              />
            } /> } />
            <Route path='/saved-movies' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <SavedMoviesPage
                isLoggedIn={ isLoggedIn }
                notification={ notification }
              />
            } /> } />
            <Route path='/profile' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <>
                <main className="content">
                  <Notification notification={ notification } />
                  <Profile
                    setCurrentUser={ setCurrentUser }
                    setNotification={ setNotification }
                    setIsLoggedIn={ setIsLoggedIn }
                  />
                </main>
              </>
            } /> } />
            <Route path='*' element={
              <main className="content">
                <NotFoundError />
              </main>
            } />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
