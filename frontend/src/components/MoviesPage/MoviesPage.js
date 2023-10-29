import * as React from 'react';
import '../Main/Main.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Notification from '../Notification/Notification';
import { SHORT_MOVIE_DURATION } from '../../utils/Config';

function MoviesPage(props) {
  React.useEffect(() => {
    props.handleSavedMoviesData();
    props.handleResize();

    props.setMoviesInputValue((state) => localStorage.moviesInputValue ? localStorage.moviesInputValue : state);
    props.setShownMovies((state) => localStorage.shownMovies ? JSON.parse(localStorage.shownMovies) : state);
    props.setCheckboxCondition(localStorage.checkboxCondition ? JSON.parse(localStorage.checkboxCondition) : false);

    window.addEventListener('resize', props.handleResize);

    return () => window.removeEventListener('resize', props.handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    props.setIsPreloaderActive(true);
    props.getMoviesDataOnLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.isLoggedIn ]);

  return(
    <>
      <Header
        isLoggedIn={ props.isLoggedIn }
        isMoviesPage={ true }
        handleNavigate={ props.handleNavigate }
      />
      <main className="content">
        <Notification notification={ props.notification } />
        <SearchForm
          moviesInputValue={ props.moviesInputValue }
          setMoviesInputValue={ props.setMoviesInputValue }
          onSubmitSearchForm={ props.onSubmitSearchForm }
          setIsPreloaderActive={ props.setIsPreloaderActive }
          setCheckboxCondition={ props.setCheckboxCondition }
          savedMoviesData={ props.savedMoviesData }
          checkboxCondition={ props.checkboxCondition }
        />
        <MoviesCardList
          moviesInputValue={ props.moviesInputValue }
          shownMovies={ props.checkboxCondition ? props.shownMoviesArray.filter((movie) => movie["duration"] <= SHORT_MOVIE_DURATION) : props.shownMovies }
          isPreloaderActive={ props.isPreloaderActive }
          notFoundMoviesText={ props.notFoundMoviesText }
          checkboxCondition={ props.checkboxCondition }
          handleMovieLike={ props.handleMovieLike }
          handleAddMovies={ props.handleAddMovies }
          shownMoviesQuantity={ props.shownMoviesQuantity }
          shownMoviesArray={ props.shownMoviesArray }
          savedMoviesData={ props.savedMoviesData }
        />
      </main>
      <Footer />
    </>
  )
}

export default MoviesPage;