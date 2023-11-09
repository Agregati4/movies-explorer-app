import '../Main/Main.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Notification from '../Notification/Notification';
import { SHORT_MOVIE_DURATION } from '../../utils/Config';
import moviesApi from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';

function MoviesPage(props) {
  const [ shownMovies, setShownMovies ] = useState([]);
  const [ moviesData, setMoviesData ] = useState([]);
  const [ notFoundMoviesText, setNotFoundMoviesText ] = useState('');
  const [ moviesInputValue, setMoviesInputValue ] = useState('');
  const [ savedMoviesData, setSavedMoviesData ] = useState([]);
  const [ isPreloaderActive, setIsPreloaderActive ] = useState(false);
  const [ checkboxCondition, setCheckboxCondition ] = useState(false);

  useEffect(() => {
    setIsPreloaderActive(true);
    props.handleResize();
    handleSavedMoviesData();

    setMoviesInputValue((state) => localStorage.moviesInputValue ? localStorage.moviesInputValue : state);
    setShownMovies((state) => localStorage.shownMovies ? JSON.parse(localStorage.shownMovies) : state);
    setCheckboxCondition(localStorage.checkboxCondition ? JSON.parse(localStorage.checkboxCondition) : false);

    window.addEventListener('resize', props.handleResize);

    return () => window.removeEventListener('resize', props.handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.isLoggedIn ])

  function handleSavedMoviesData() {
    mainApi.getSavedMoviesData()
    .then((moviesData) => {
      setSavedMoviesData(moviesData.data);
      getMoviesDataOnLoad(moviesData.data);
    })
    .catch((err) => console.log(err));
  }
  
  function getMoviesDataOnLoad(savedMoviesData) {
    moviesApi.getMovies()
    .then((movies) => {
      setMoviesData(movies);

      if (!localStorage.shownMovies) {
        const { moviesWithIsSavedProperty } = defineSavedMovies(movies, savedMoviesData);
        setShownMovies(moviesWithIsSavedProperty);
      }

      setNotFoundMoviesText("Ничего не найдено");
      props.handleResize();
    })
    .catch(() => {
      setNotFoundMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
    })
    .finally(() => {
      setIsPreloaderActive(false);
    })
  }

  function onSubmitMoviesPageSearchForm() {
    const filteredMovies = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(moviesInputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(moviesInputValue.toLowerCase())
    );
    const { moviesWithIsSavedProperty } = defineSavedMovies(filteredMovies, savedMoviesData);
    setShownMovies(moviesWithIsSavedProperty);

    setIsPreloaderActive(false);
    props.handleResize();

    localStorage.setItem("moviesInputValue", moviesInputValue);
    localStorage.setItem("shownMovies", JSON.stringify(moviesWithIsSavedProperty));
  }

  function defineSavedMovies(allMoviesData, savedMoviesData) {
    const moviesWithIsSavedProperty = allMoviesData.map((movie) =>
      savedMoviesData.some((savedMovie) => savedMovie.movieId === movie.id) ? { ...movie, isCardSaved: true } : { ...movie, isCardSaved: false }
    );

    return { moviesWithIsSavedProperty };
  }

  function handleMovieLike(movieData, savedMoviesData) {
    if (movieData.isCardSaved) {
      handleDeleteMovie(movieData, savedMoviesData);
    } else {
      handleSaveMovie(movieData);
    }
  }

  function handleDeleteMovie(movieData, savedMoviesData) {
    const deleteMovieId = savedMoviesData.find((movie) => movie.movieId === movieData.id)._id;
    mainApi.deleteMovie(deleteMovieId)
    .then((deletedMovieData) => {
      const moviesToShow = shownMovies.map((movie) => movie.id === deletedMovieData.movieId ? { ...movie, isCardSaved: false } : movie);
      setShownMovies(moviesToShow);

      localStorage.setItem("shownMovies", JSON.stringify(moviesToShow));
    })
    .catch(() => {
      props.setNotification({ text: 'Не удалось удалить сохраненный фильм. Попробуйте позже', isActive: true, isGood: false });
      setTimeout(() => {
        props.setNotification(state => ({ ...state, text: '', isActive: false }));
      }, 3000);
    })
  }

  function handleSaveMovie(movieData) {
    mainApi.saveMovie(movieData)
    .then((newMovieData) => {
      const currentMovie = shownMovies.find((movie) => movie.id === newMovieData.data.movieId);
      currentMovie.isCardSaved = true;

      const moviesToShow = shownMovies.map((movie) => movie.id === currentMovie.id ? currentMovie : movie);
      setSavedMoviesData(state => ([ ...state, newMovieData.data ]));
      setShownMovies(moviesToShow);

      localStorage.setItem("shownMovies", JSON.stringify(moviesToShow));
    })
    .catch(() => {
      props.setNotification({ text: 'Не удалось сохранить фильм. Попробуйте позже', isActive: true, isGood: false });
      setTimeout(() => {
        props.setNotification(state => ({ ...state, text: '', isActive: false }));
      }, 3000);
    })
  }

  return(
    <>
      <main className="content">
        <Notification notification={ props.notification } />
        <SearchForm
          moviesInputValue={ moviesInputValue }
          setMoviesInputValue={ setMoviesInputValue }
          onSubmitSearchForm={ onSubmitMoviesPageSearchForm }
          setIsPreloaderActive={ setIsPreloaderActive }
          setCheckboxCondition={ setCheckboxCondition }
          checkboxCondition={ checkboxCondition }
        />
        <MoviesCardList
          shownMovies={ checkboxCondition ? shownMovies.filter((movie) => movie["duration"] <= SHORT_MOVIE_DURATION) : shownMovies.slice(0, props.shownMoviesQuantity) }
          isPreloaderActive={ isPreloaderActive }
          notFoundMoviesText={ notFoundMoviesText }
          handleMovieLike={ handleMovieLike }
          handleAddMovies={ props.handleAddMovies }
          shownMoviesQuantity={ props.shownMoviesQuantity }
          shownMoviesArray={ shownMovies }
          savedMoviesData={ savedMoviesData }
        />
      </main>
      <Footer />
    </>
  )
}

export default MoviesPage;