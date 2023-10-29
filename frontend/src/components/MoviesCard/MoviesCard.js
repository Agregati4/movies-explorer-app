import * as React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const isSavedIconNeed = props.data.isCardSaved && !props.isSavedMoviesPage;

  function onClickSaveCardButton() {
    props.handleMovieLike(props.data, props.savedMoviesData);
  }

  return (
    <div className="movies-card">
      <a href={ props.data.trailerLink } rel="noreferrer" target="_blank" className="movies-card__image-link">
        <img
          src={ props.isSavedMoviesPage ? props.data.image : `https://api.nomoreparties.co/${ props.data.image.url }` }
          className="movies-card__image"
          alt={ `Постер к фильму ${ props.data.nameRU }` }
        />
      </a>
      <button type="button" onClick={ props.isSavedMoviesPage ? () => props.handleDeleteMovie(props.data._id) : () => onClickSaveCardButton() } className={
        `movies-card__save-condition
        ${ isSavedIconNeed ? "movies-card__save-condition_saved" : "" }
        ${ props.isSavedMoviesPage ? "movies-card__save-condition_saved-movies-page" : ""}`
      }>{ props.isCardSaved || props.data.isCardSaved ? "" : "Сохранить" }</button>
      <div className="movies-card__description">
        <h2 className="movies-card__film-title">{ props.data.nameRU }</h2>
        <p className="movies-card__film-duration">{ `${ Math.floor(props.data.duration/60) }ч ${ Math.floor(props.data.duration%60) }м` }</p>
      </div>
    </div>
  );
}

export default MoviesCard;