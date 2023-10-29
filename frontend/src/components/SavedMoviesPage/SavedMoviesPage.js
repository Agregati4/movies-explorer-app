import * as React from 'react';
import '../Main/Main.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Notification from '../Notification/Notification';
import { SHORT_MOVIE_DURATION } from '../../utils/Config';

function SavedMoviesPage(props) {
  React.useEffect(() => {
    props.handleShownSavedMovies();
    props.handleSavedMoviesData();

    props.setCheckboxCondition(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <>
      <Header
        isLoggedIn={ props.isLoggedIn }
        isSavedMoviesPage={ true }
        handleNavigate={ props.handleNavigate }
      />
      <main className="content">
        <Notification notification={ props.notification } />
        <SearchForm
          isSavedMoviesPage={ true }
          moviesInputValue={ props.moviesInputValue }
          setMoviesInputValue={ props.setMoviesInputValue }
          setCheckboxCondition={ props.setCheckboxCondition }
          onSubmitSearchForm={ props.onSubmitSearchForm }
          setIsPreloaderActive={ props.setIsPreloaderActive }
          checkboxCondition={ props.checkboxCondition }
        />
        <MoviesCardList
          isSavedMoviesPage={ true }
          shownMovies={ props.checkboxCondition ? props.shownMovies.filter((movie) => movie["duration"] <= SHORT_MOVIE_DURATION) : props.shownMovies }
          isPreloaderActive={ props.isPreloaderActive }
          notFoundMoviesText={ props.notFoundMoviesText }
          isCardSaved={ true }
          handleDeleteMovie={ props.handleDeleteMovie }
          checkboxCondition={ props.checkboxCondition }
          shownMoviesArray={ props.shownMoviesArray }
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMoviesPage;