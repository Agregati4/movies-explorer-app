import '../Main/Main.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Notification from '../Notification/Notification';
import { SHORT_MOVIE_DURATION } from '../../utils/Config';
import mainApi from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function SavedMoviesPage(props) {
  const [ shownSavedMovies, setShownSavedMovies ] = useState([]);
  const [ savedMoviesData, setSavedMoviesData ] = useState([]);
  const [ savedMoviesInputValue, setSavedMoviesInputValue ] = useState('');
  const [ isPreloaderActive, setIsPreloaderActive ] = useState(false);
  const [ checkboxCondition, setCheckboxCondition ] = useState(false);

  useEffect(() => {
    handleShownSavedMovies();
    handleSavedMoviesData();

    setCheckboxCondition(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
      props.setNotification({ text: 'Не удалось удалить сохраненный фильм. Попробуйте позже', isActive: true, isGood: false });
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
          isSavedMoviesPage={ true }
          moviesInputValue={ props.moviesInputValue }
          setMoviesInputValue={ setSavedMoviesInputValue }
          setCheckboxCondition={ setCheckboxCondition }
          onSubmitSearchForm={ onSubmitSavedMoviesPageSearchForm }
          setIsPreloaderActive={ setIsPreloaderActive }
          checkboxCondition={ checkboxCondition }
        />
        <MoviesCardList
          isSavedMoviesPage={ true }
          shownMovies={ checkboxCondition ? shownSavedMovies.filter((movie) => movie["duration"] <= SHORT_MOVIE_DURATION) : shownSavedMovies.slice(0, props.shownMoviesQuantity) }
          isPreloaderActive={ isPreloaderActive }
          notFoundMoviesText={ props.notFoundMoviesText }
          isCardSaved={ true }
          handleDeleteMovie={ handleDeleteMovie }
          shownMoviesArray={ shownSavedMovies }
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMoviesPage;