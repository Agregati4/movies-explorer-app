import * as React from 'react';
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
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import auth from '../Auth/Auth';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import MoviesPage from '../MoviesPage/MoviesPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundError from '../NotFoundError/NotFoundError';
import SavedMoviesPage from '../SavedMoviesPage/SavedMoviesPage';
import Notification from '../Notification/Notification';

function App() {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(true);
  const [ signErrorMessage, setSignErrorMessage ] = React.useState('');
  const [ isProfileInputsActive, setIsProfileInputsActive ] = React.useState(false);
  const [ profileSaveInfoErrorText, setProfileSaveInfoErrorText ] = React.useState('');
  const [ moviesInputValue, setMoviesInputValue ] = React.useState('');
  const [ savedMoviesInputValue, setSavedMoviesInputValue ] = React.useState('');
  const [ shownMovies, setShownMovies ] = React.useState([]);
  const [ moviesData, setMoviesData ] = React.useState([]);
  const [ isPreloaderActive, setIsPreloaderActive ] = React.useState(false);
  const [ notFoundMoviesText, setNotFoundMoviesText ] = React.useState('');
  const [ checkboxCondition, setCheckboxCondition ] = React.useState(false);
  const [ shownSavedMovies, setShownSavedMovies ] = React.useState([]);
  const [ savedMoviesData, setSavedMoviesData ] = React.useState([]);
  const [ profileSaveButtonText, setProfileSaveButtonText ] = React.useState('Сохранить');
  const [ logButtonText, setLogButtonText ] = React.useState('Войти');
  const [ regButtonText, setRegButtonText ] = React.useState('Зарегистрироваться');
  const [ shownMoviesQuantity, setShownMoviesQuantity ] = React.useState(SHOWN_MOVIES_QUANTITY_HIGH);
  const [ addMoviesQuantity, setAddMoviesQuantity ] = React.useState(ADD_MOVIES_QUANTITY_HIGH);
  const [ pageDisplayNone, setPageDisplayNone ] = React.useState(true);
  const [ notification, setNotification ] = React.useState({ text: '', isGood: false, isActive: false });

  React.useEffect(() => {
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

  function handleNavigate(route) {
    navigate(route);
  }

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

  function onSignOut() {
    auth.signOut()
    .then(() => {
      setIsLoggedIn(false);
      setCurrentUser({ name: "", email: "" });
      localStorage.clear();
      setIsProfileInputsActive(false);
    })
    .catch((err) => {
      if (err.status === 500) {
        setProfileSaveInfoErrorText("На сервере произошла ошибка.")
      } else {
        setProfileSaveInfoErrorText("Не удалось выйти из аккаунта. Попробуйте через 2 минуты.");
      }
    })
  }

  function handleNotificationClose() {
    setNotification({ text: '', isActive: false, isGood: false });
  }

  function onUpdateUser(data) {
    mainApi.updateCurrentUser(data)
    .then((userInfo) => {
      setCurrentUser({ name: userInfo.data.name, email: userInfo.data.email });
      handleProfileInputsActive();
      setProfileSaveInfoErrorText("");

      setNotification({ text: 'Данные успешно обновлены!', isActive: true, isGood: true });
      setTimeout(() => {
        handleNotificationClose()
      }, 3000);
    })
    .catch((err) => {
      if (err.status === 409) {
        setProfileSaveInfoErrorText("Пользователь с таким email уже существует.");
        return;
      }

      if (err.status === 500) {
        setProfileSaveInfoErrorText("На сервере произошла ошибка.")
      } else {
        setProfileSaveInfoErrorText("При обновлении профиля произошла ошибка.");
      }
    })
    .finally(() => {
      setProfileSaveButtonText('Сохранить');
    })
  }

  function handleProfileInputsActive() {
    setIsProfileInputsActive(!isProfileInputsActive);
  }

  function getMoviesDataOnLoad() {
    moviesApi.getMovies()
    .then((movies) => {
      setMoviesData(movies);
      if (!localStorage.shownMovies) {
        setShownMovies(movies);
      }
      setNotFoundMoviesText("Ничего не найдено");
      handleResize();
    })
    .catch(() => {
      setNotFoundMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
    })
    .finally(() => {
      setIsPreloaderActive(false);
    })
  }

  function onSubmitMoviesPageSearchForm(data) {
    const filteredMovies = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(moviesInputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(moviesInputValue.toLowerCase())
    );
    const finalMovies = filteredMovies.map((movie) => 
      data.some((savedMovie) => savedMovie.movieId === movie.id) ? { ...movie, isCardSaved: true } : { ...movie, isCardSaved: false }
    );

    setShownMovies(finalMovies);
    setIsPreloaderActive(false);
    handleResize();

    localStorage.setItem("moviesInputValue", moviesInputValue);
    localStorage.setItem("shownMovies", JSON.stringify(finalMovies));
  }

  function handleMovieLike(movieData, savedMoviesData) {
    if (movieData.isCardSaved) {
      mainApi.deleteMovie(savedMoviesData.find((movie) => movie.movieId === movieData.id)._id)
      .then((deletedMovieData) => {
        const moviesToShow = shownMovies.map((movie) => movie.id === deletedMovieData.movieId ? { ...movie, isCardSaved: false } : movie);
        setShownMovies(moviesToShow);

        localStorage.setItem("shownMovies", JSON.stringify(moviesToShow));

        setSavedMoviesData((state) => state.splice(state.indexOf(state.find((movie) => movie.id === deletedMovieData.movieId)), 1));
      })
      .catch(() => {
        setNotification({ text: 'Не удалось удалить сохраненный фильм. Попробуйте позже', isActive: true, isGood: false });
        setTimeout(() => {
          handleNotificationClose()
        }, 3000);
      })
    } else {
      mainApi.saveMovie(movieData)
      .then((newMovieData) => {
        const currentMovie = shownMovies.find((movie) => movie.id === newMovieData.data.movieId);
        currentMovie.isCardSaved = true;

        const moviesToShow = shownMovies.map((movie) => movie.id === currentMovie.id ? currentMovie : movie);
        setShownMovies(moviesToShow);

        localStorage.setItem("shownMovies", JSON.stringify(moviesToShow));

        setSavedMoviesData((state) => [ ...state, newMovieData.data ]);
      })
      .catch(() => {
        setNotification({ text: 'Не удалось сохранить фильм. Попробуйте позже', isActive: true, isGood: false });
        setTimeout(() => {
          handleNotificationClose()
        }, 3000);
      })
    }
  }

  function handleDeleteMovie(_id) {
    mainApi.deleteMovie(_id)
    .then((deletedMovieData) => {
      const moviesData = shownSavedMovies.filter((movie) => !(movie._id === deletedMovieData._id));
      setShownSavedMovies(moviesData);
      setSavedMoviesData(moviesData);

      if (localStorage.shownMovies) {
        const shownMovies = JSON.parse(localStorage.shownMovies);

        const shownMoviesNow = shownMovies.map((movie) => movie.id === deletedMovieData.movieId ? { ...movie, isCardSaved: false } : movie);

        localStorage.setItem("shownMovies", JSON.stringify(shownMoviesNow));
      }
    })
    .catch(() => {
      setNotification({ text: 'Не удалось удалить сохраненный фильм. Попробуйте позже', isActive: true, isGood: false });
      setTimeout(() => {
        handleNotificationClose()
      }, 3000);
    })
  }

  function handleShownSavedMovies() {
    mainApi.getSavedMoviesData()
    .then((moviesData) => {
      setShownSavedMovies(moviesData.data);
    })
    .catch((err) => console.log(err))
  }

  function handleSavedMoviesData() {
    mainApi.getSavedMoviesData()
    .then((moviesData) => {
      setSavedMoviesData(moviesData.data);
    })
    .catch((err) => console.log(err));
  }

  function onSubmitSavedMoviesPageSearchForm() {
    const shownMovies = savedMoviesData.filter(
      (movie) => movie.nameRU.toLowerCase().includes(savedMoviesInputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(savedMoviesInputValue.toLowerCase())
    );
    setShownSavedMovies(shownMovies);

    setNotFoundMoviesText("Ничего не найдено");
  }

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
          <Routes>
            <Route path='/' element={
              <>
                <Header
                  isLoggedIn={ isLoggedIn }
                  handleNavigate={ handleNavigate }
                />
                <Main />
                <Footer />
              </>
            } />
            <Route path='/signin' element={
              <main className="content">
                <Login
                  handleNavigate={ handleNavigate }
                  login={ true }
                  onSignIn={ onSignIn }
                  signErrorMessage={ signErrorMessage }
                  setSignErrorMessage={ setSignErrorMessage }
                  logButtonText={ logButtonText }
                  setLogButtonText={ setLogButtonText }
                  navigate={ navigate }
                  isLoggedIn={ isLoggedIn }
                />
              </main>
            } />
            <Route path='/signup' element={
              <main className="content">
                <Register
                  handleNavigate={ handleNavigate }
                  onSignUp={ onSignUp }
                  signErrorMessage={ signErrorMessage }
                  setSignErrorMessage={ setSignErrorMessage }
                  regButtonText={ regButtonText }
                  setRegButtonText={ setRegButtonText }
                  navigate={ navigate }
                  isLoggedIn={ isLoggedIn }
                />
              </main>
            } />
            <Route path='/movies' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <MoviesPage
                isLoggedIn={ isLoggedIn }
                handleNavigate={ handleNavigate }
                moviesInputValue={ moviesInputValue }
                setMoviesInputValue={ setMoviesInputValue }
                onSubmitSearchForm={ onSubmitMoviesPageSearchForm }
                setIsPreloaderActive={ setIsPreloaderActive }
                setCheckboxCondition={ setCheckboxCondition }
                shownMovies={ shownMovies.slice(0, shownMoviesQuantity) }
                shownMoviesArray = { shownMovies }
                isPreloaderActive={ isPreloaderActive }
                notFoundMoviesText={ notFoundMoviesText }
                checkboxCondition={ checkboxCondition }
                handleMovieLike={ handleMovieLike }
                handleSavedMoviesData={ handleSavedMoviesData }
                savedMoviesData={ savedMoviesData }
                setShownMoviesQuantity={ setShownMoviesQuantity }
                handleAddMovies={ handleAddMovies }
                shownMoviesQuantity={ shownMoviesQuantity }
                setAddMoviesQuantity={ setAddMoviesQuantity }
                handleResize={ handleResize }
                notification={ notification }
                setShownMovies={ setShownMovies }
                getMoviesDataOnLoad={ getMoviesDataOnLoad }
              />
            } /> } />
            <Route path='/saved-movies' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <SavedMoviesPage
                isLoggedIn={ isLoggedIn }
                handleNavigate={ handleNavigate }
                shownMovies={ shownSavedMovies }
                isPreloaderActive={ isPreloaderActive }
                setIsPreloaderActive={ setIsPreloaderActive }
                notFoundMoviesText={ notFoundMoviesText }
                handleShownSavedMovies={ handleShownSavedMovies }
                handleDeleteMovie={ handleDeleteMovie }
                onSubmitSearchForm={ onSubmitSavedMoviesPageSearchForm }
                moviesInputValue={ savedMoviesInputValue }
                setMoviesInputValue={ setSavedMoviesInputValue }
                handleSavedMoviesData={ handleSavedMoviesData }
                setCheckboxCondition={ setCheckboxCondition }
                checkboxCondition={ checkboxCondition }
                shownMoviesArray={ shownMovies }
                notification={ notification }
              />
            } /> } />
            <Route path='/profile' element={ <ProtectedRoute isLoggedIn={ isLoggedIn } element={
              <>
                <Header
                  isLoggedIn={ isLoggedIn }
                  handleNavigate={ handleNavigate }
                />
                <main className="content">
                  <Notification notification={ notification } />
                  <Profile
                    handleNavigate={ handleNavigate }
                    onSignOut={ onSignOut }
                    onUpdateUser={ onUpdateUser }
                    isInputsActive={ isProfileInputsActive }
                    handleInputsActive={ handleProfileInputsActive }
                    profileSaveInfoErrorText={ profileSaveInfoErrorText }
                    profileSaveButtonText={ profileSaveButtonText }
                    setProfileSaveButtonText={ setProfileSaveButtonText }
                  />
                </main>
              </>
            } /> } />
            <Route path='*' element={
              <main className="content">
                <NotFoundError handleNavigate={ handleNavigate } />
              </main>
            } />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
