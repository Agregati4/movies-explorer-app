import * as React from 'react';
import './MoviesCardList.css';
import '../../vendor/displayNone.css';
import MoviePageCondition from '../MoviePageCondition/MoviePageCondition';

function MoviesCardList(props) {
  // eslint-disable-next-line eqeqeq
  const isMoviesNotFound = props.isPreloaderActive || props.shownMovies.length == 0;
  const isAddMoviesButtonNotNeed = props.shownMoviesArray.length <= props.shownMoviesQuantity || props.isSavedMoviesPage || isMoviesNotFound || props.shownMovies.length < props.shownMoviesQuantity;

  return (
    <section className="movies-cardlist">
      <div className={
        `movies-cardlist__grid-container
        ${ props.isSavedMoviesPage ? "movies-cardlist__grid-container_saved-movies-page" : "" }
        ${ isMoviesNotFound ? "movies-cardlist__grid-container_movies-not-found" : ""}`
      }>
      {
        <MoviePageCondition
          isPreloaderActive={ props.isPreloaderActive }
          shownMovies={ props.shownMovies }
          notFoundMoviesText={ props.notFoundMoviesText }
          handleMovieLike={ props.handleMovieLike }
          isSavedMoviesPage={ props.isSavedMoviesPage }
          isCardSaved={ props.isCardSaved }
          handleDeleteMovie={ props.handleDeleteMovie }
          savedMoviesData={ props.savedMoviesData }
        />
      }
      </div>
      <button onClick={ props.handleAddMovies } type="button" className={
        `movies-cardlist__button
        ${ isAddMoviesButtonNotNeed ? "display-none" : "" }`
      }>Ещё</button>
    </section>
  );
}

export default MoviesCardList;